defmodule LiveroomWeb.ConnectedLive do
  use LiveroomWeb, :live_view

  alias Liveroom.Repo
  alias Liveroom.Accounts.User
  alias LiveroomWeb.Components

  @impl true
  def render(assigns) do
    ~H"""
    <%!-- <p :if={@name} class="text-lg font-bold tracking-tight select-none">Welcome <%= @name %> 👋</p> --%>
    <div
      id="connected"
      phx-hook="SendExtensionVersionHook"
      class="w-[min(100%,700px)] flex flex-col items-stretch gap-8"
    >
      <div class="w-full flex justify-between items-center gap-32">
        <div class="flex items-center gap-4">
          <img :if={@picture_url} src={@picture_url} width="44px" class="rounded-full" />
          <p :if={@email} class="font-semibold select-none"><%= @email %></p>
        </div>

        <.link
          href={~p"/accounts/users/log_out"}
          method="delete"
          class="bg-zinc-100/20 hover:bg-zinc-100/75 py-1 px-2 font-medium rounded transition-colors"
        >
          Log out
        </.link>
      </div>

      <h2 class="mt-12 text-lg font-semibold tracking-tight">Liveroom Chrome Extension</h2>

      <.live_component
        module={Components.CheckExtensionInstallation}
        id="check_extension_installation"
        version={@version_extension}
      />

      <div class="flex justify-between items-baseline">
        <h2 class="mt-12 text-lg font-semibold tracking-tight">Liveroom Client</h2>
        <a
          href={@website_url}
          target="_blank"
          class="mr-1 block underline font-medium text-zinc-600 text-sm"
        >
          <%= @website_url %>
        </a>
      </div>

      <.live_component
        module={Components.CheckClientInstallation}
        id="check_client_installation"
        version={@version_client}
      />

      <h2 class="mt-12 text-lg font-semibold tracking-tight">Settings</h2>

      <div class="px-6 flex flex-col items-start gap-2">
        <p>Enter your website url below:</p>

        <.form
          for={@form}
          id="website_form"
          phx-submit="save"
          phx-change="validate"
          class="w-[min(100%,400px)] flex [&>*]:w-full items-center gap-4"
        >
          <.input field={@form[:website_url]} type="text" placeholder="https://mysaas.com" required />

          <.button class="!w-fit mt-2 ml-auto flex justify-center items-center pl-2 pr-4">
            <.icon name="hero-pencil" class="h-4 w-4 mr-2" />Save
          </.button>
        </.form>
      </div>
    </div>
    """
  end

  ### Components

  ### Server

  @impl true
  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign_user(socket.assigns.current_user)
      |> assign_form()
      |> assign(version_client: nil, version_extension: nil)

    if connected?(socket) do
      fetch_client_version!(socket.assigns.website_url)
    end

    {:ok, socket}
  end

  @impl true
  def handle_params(params, _uri, socket) do
    socket =
      if params != %{} do
        assign_user(socket, params)
      else
        socket
      end

    {:noreply, socket}
  end

  @impl true
  def handle_event("save", %{"user" => user_params}, socket) do
    case socket.assigns.current_user
         |> User.website_url_changeset(%{website_url: user_params["website_url"]})
         |> Repo.update() do
      {:ok, user} ->
        fetch_client_version!(user.website_url)

        {:noreply,
         socket
         |> assign(current_user: user)
         |> assign_user(user)
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

  @impl true
  def handle_event("update_version_extension", %{"version" => version} = _payload, socket) do
    {:noreply, assign(socket, version_extension: version)}
  end

  @impl true
  def handle_event("refresh_client_version", _params, socket) do
    fetch_client_version!(socket.assigns.current_user.website_url)
    {:noreply, socket}
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

  defp assign_user(socket, %User{} = user) do
    assign(socket,
      email: user.email,
      # name: user.name,
      name: nil,
      picture_url: user.picture_url,
      website_url: user.website_url
    )
  end

  defp assign_user(socket, user) do
    assign(socket,
      email: user["email"] || user[:email],
      name: user["name"] || user[:name],
      picture_url: user["picture_url"] || user[:picture_url],
      website_url: user["website_url"] || user[:website_url]
    )
  end

  def fetch_client_version!(url) do
    self = self()

    Task.start(fn ->
      version =
        case Req.get(url) do
          {:ok, %Req.Response{status: 200, body: html}} ->
            html
            |> Floki.parse_document!()
            |> Floki.find("script[src*='liveroom-client-element']")
            |> then(
              &case Floki.attribute(&1, "src") do
                [src] ->
                  ~r/liveroom-client-element@((\d|\.)+)\//
                  |> Regex.run(src)
                  |> Enum.at(1)

                [] ->
                  nil
              end
            )

          _x ->
            nil
        end

      send(self, {:client_version, version})
    end)
  end
end
