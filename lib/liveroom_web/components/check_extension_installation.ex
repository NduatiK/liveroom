defmodule LiveroomWeb.Components.CheckExtensionInstallation do
  use LiveroomWeb, :live_component

  alias Liveroom.EventNotifier
  alias LiveroomWeb.Components.Banner

  @impl true
  def render(assigns) do
    ~H"""
    <%!-- Super weird, Liveview throws an error if I don't wrap the banner in a span. --%>
    <span>
      <Banner.render version={@version} latest_version="0.0.17" installed="installed on your computer">
        <:when_no_version>
          <div class="flex justify-between items-center">
            <p class="flex items-center gap-1.5 text-amber-600">
              <.icon name="hero-exclamation-triangle-mini" class="mt-0.5 h-5 w-5" />
              <span class="font-semibold">not installed</span>
            </p>

            <a
              href="https://chrome.google.com/webstore/detail/liveroom/famgmncbiedbdkgpkfdnmefhfhbgljhb"
              target="_blank"
              phx-click={JS.push("install_extension_button_clicked", target: @myself)}
              class="w-fit font-semibold group"
            >
              <.button class="flex justify-center items-center">
                Install it here
                <.icon
                  name="hero-arrow-right-mini"
                  class="inline-block ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                />
              </.button>
            </a>
          </div>
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
        # version: "0.0.17"
        version: assigns.version,
        # NOTE: Needed to send analytic events
        analytics_data: assigns.analytics_data,
        current_user_email: assigns.current_user_email
      )

    {:ok, socket}
  end

  @impl true
  def handle_event("install_extension_button_clicked", _payload, socket) do
    EventNotifier.emit(:install_extension_button_clicked, socket,
      email: socket.assigns.current_user_email
    )

    {:noreply, socket}
  end
end
