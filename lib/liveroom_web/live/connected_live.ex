defmodule LiveroomWeb.ConnectedLive do
  use LiveroomWeb, :live_view

  alias Liveroom.Repo
  alias Liveroom.Accounts.User
  alias Liveroom.EventNotifier
  alias LiveroomWeb.Components

  @impl true
  def render(assigns) do
    ~H"""
    <%!-- <p :if={@current_user.name} class="text-lg font-bold tracking-tight select-none">Welcome <%= @current_user.name %> 👋</p> --%>
    <div
      id="connected"
      phx-hook="SendExtensionVersionHook"
      class="w-[min(100%,700px)] flex flex-col items-stretch gap-8"
    >
      <div class="w-full flex justify-between items-center gap-32">
        <div class="flex items-center gap-4">
          <img
            :if={@current_user.picture_url}
            src={@current_user.picture_url}
            width="44px"
            class="rounded-full"
          />
          <p :if={@current_user.email} class="font-semibold select-none">
            <%= @current_user.email %>
          </p>
        </div>

        <.link
          href={~p"/accounts/users/log_out"}
          method="delete"
          class="bg-zinc-100/20 hover:bg-zinc-100/75 py-1 px-2 font-medium rounded transition-colors"
        >
          Log out
        </.link>
      </div>

      <div class="flex justify-between items-baseline">
        <h2 class="mt-12 text-lg font-semibold tracking-tight">Liveroom Script</h2>
        <%!-- <a
          href={@current_user.website_url}
          target="_blank"
          class="mr-1 block underline font-medium text-zinc-600 text-sm"
        >
          <%= @current_user.website_url %>
        </a> --%>
      </div>

      <div class="flex justify-between items-baseline gap-6">
        <p>Your product demo page:</p>

        <.form
          for={@form}
          id="website_form"
          phx-submit="save"
          phx-change="validate"
          class="w-[min(100%,400px)] flex [&>*]:w-full items-start gap-4"
        >
          <.input
            field={@form[:website_url]}
            type="text"
            placeholder="https://mysaas.com"
            required
            input_class="!mt-0 placeholder:text-zinc-400/50"
          />
          <.button class="!w-fit ml-auto flex justify-center items-center px-4">Save</.button>
        </.form>
      </div>

      <.live_component
        :if={@current_user.website_url}
        module={Components.CheckClientInstallation}
        id="check_client_installation"
        version={@version_client}
        analytics_data={@analytics_data}
        current_user_email={@current_user.email}
      />

      <h2 class="mt-12 text-lg font-semibold tracking-tight">Liveroom Chrome Extension</h2>

      <.live_component
        module={Components.CheckExtensionInstallation}
        id="check_extension_installation"
        version={@version_extension}
        analytics_data={@analytics_data}
        current_user_email={@current_user.email}
      />
    </div>
    """
  end

  ### Components

  ### Server

  @impl true
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign_form()
      |> assign(version_client: nil, version_extension: nil)

    website_url = socket.assigns.current_user.website_url

    if connected?(socket) && website_url do
      fetch_client_version!(website_url, false)
    end

    {:ok, socket}
  end

  @impl true
  def handle_event("save", %{"user" => user_params}, socket) do
    case socket.assigns.current_user
         |> User.website_url_changeset(%{website_url: user_params["website_url"]})
         |> Repo.update() do
      {:ok, user} ->
        EventNotifier.emit(:user_website_url_updated, socket,
          email: user.email,
          website_url: user.website_url
        )

        fetch_client_version!(user.website_url, true)

        {:noreply,
         socket
         |> assign(current_user: user)
         |> assign_form()
         |> assign(version_client: nil)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  def handle_event("validate", %{"user" => user_params}, socket) do
    changeset =
      User.website_url_changeset(socket.assigns.current_user, %{
        website_url: user_params["website_url"]
      })

    {:noreply, assign_form(socket, Map.put(changeset, :action, :validate))}
  end

  def handle_event("update_version_extension", %{"version" => version} = _payload, socket) do
    {:noreply, assign(socket, version_extension: version)}
  end

  def handle_event("refresh_client_version", _params, socket) do
    EventNotifier.emit(:refresh_client_version_button_clicked, socket,
      email: socket.assigns.current_user.email
    )

    # simulate latency for better UX
    fetch_client_version!(socket.assigns.current_user.website_url, true)

    {:noreply, assign(socket, version_client: nil)}
  end

  @impl true
  def handle_info({:client_version, version}, socket) do
    {:noreply, assign(socket, version_client: version)}
  end

  ### Helpers

  defp assign_form(socket) do
    changeset = User.website_url_changeset(socket.assigns.current_user, %{})
    assign_form(socket, changeset)
  end

  defp assign_form(socket, %Ecto.Changeset{} = changeset) do
    form = to_form(changeset, as: "user")
    assign(socket, form: form)
  end

  def fetch_client_version!(url, pause \\ false) do
    self = self()

    Task.start(fn ->
      # simulate latency for better UX
      pause && Process.sleep(600)

      url =
        case url do
          "http://localhost" <> _ = url ->
            url
            |> String.trim_trailing("/")
            |> then(&(&1 <> "/index.html"))

          url ->
            url
        end

      version =
        case Req.get(url, retry: false) do
          {:ok, %Req.Response{status: 200, body: html}} ->
            doc = Floki.parse_document!(html)

            case doc
                 |> Floki.find("script[src*='liveroom-client-element']")
                 |> Floki.attribute("src") do
              [src] ->
                ~r/liveroom-client-element@((\d|\.)+)\//
                |> Regex.run(src)
                |> Enum.at(1)

              [] ->
                case Floki.find(doc, "script[src='/src/main.ts']") do
                  [_] -> "local"
                  _ -> "noversion"
                end
            end

          _ ->
            "noversion"
        end

      send(self, {:client_version, version})
    end)
  end
end
