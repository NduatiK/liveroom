defmodule LiveroomWeb.Components.CheckClientInstallation do
  use LiveroomWeb, :live_component

  alias Liveroom.EventNotifier
  alias LiveroomWeb.Components.Banner

  @impl true
  def render(assigns) do
    ~H"""
    <%!-- Super weird, Liveview throws an error if I don't wrap the banner in a span. --%>
    <span>
      <Banner.render version={@version} latest_version="0.0.23" installed="installed on your website">
        <:when_no_version>
          <div class="flex justify-between items-center flex-wrap gap-y-6 mb-4">
            <p class="flex items-center gap-1.5 text-amber-600">
              <.icon name="hero-exclamation-triangle-mini" class="mt-0.5 h-5 w-5" />
              <span class="font-semibold">not installed</span>
            </p>

            <div class="flex items-center gap-4">
              <.button
                phx-click="refresh_client_version"
                class="flex justify-center items-center group !text-zinc-800 !bg-amber-50 hover:!bg-amber-200/30"
              >
                Check again <.icon name="hero-arrow-path-mini" class="inline-block ml-2 h-4 w-4" />
              </.button>

              <.button
                id="copy_script_tag"
                phx-click={JS.push("copy_script_tag", target: @myself)}
                phx-hook="CopyToClipboardButtonHook"
                class="flex justify-center items-center group disabled:bg-zinc-900 disabled:hover:bg-zinc-900"
              >
                <span class="hidden group-data-[copied=true]:block">Copied!</span>
                <span class="group-data-[copied=true]:hidden">Copy</span>
                <.icon
                  name="hero-clipboard-mini"
                  class="group-data-[copied=true]:hidden inline-block ml-2 h-4 w-4"
                />
              </.button>
            </div>
          </div>

          <p class="pl-0.5">
            Copy the following code in the <span class="font-semibold">&lt;head&gt;</span>
            HTML tag of your website
          </p>

          <p
            class="group text-xs font-bold bg-white/95 outline outline-amber-600/10 rounded p-4 whitespace-pre overflow-x-auto select-all font-mono"
            phx-no-format
          ><%= @script_tag_text %></p>
        </:when_no_version>
      </Banner.render>
    </span>
    """
  end

  ### Server

  @impl true
  def update(assigns, socket) do
    socket =
      assign(socket,
        version: assigns.version,
        # NOTE: Needed to send analytic events
        analytics_data: assigns.analytics_data,
        current_user_email: assigns.current_user_email,
        script_tag_text:
          """
          <script
            type="module"
            src="https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.23/dist/main.min.js"
          ></script>
          """
          |> String.trim_leading()
          |> String.trim_trailing()
      )

    {:ok, socket}
  end

  @impl true
  def handle_event("copy_script_tag", _payload, socket) do
    EventNotifier.emit(:copy_script_tag_button_clicked, socket,
      email: socket.assigns.current_user_email
    )

    socket = push_event(socket, "copy_to_clipboard", %{text: socket.assigns.script_tag_text})

    {:noreply, socket}
  end
end
