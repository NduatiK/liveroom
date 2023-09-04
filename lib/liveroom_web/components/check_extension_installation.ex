defmodule LiveroomWeb.Components.CheckExtensionInstallation do
  use LiveroomWeb, :live_component

  alias LiveroomWeb.Components.Banner

  @impl true
  def render(assigns) do
    ~H"""
    <%!-- Super weird, Liveview throws an error if I don't wrap the banner in a span. --%>
    <span>
      <Banner.render version={@version} latest_version="0.0.9" installed="installed on your computer">
        <:when_no_version>
          <div class="flex justify-between items-center">
            <p class="flex items-center gap-1.5 text-amber-600">
              <.icon name="hero-exclamation-triangle-mini" class="mt-0.5 h-5 w-5" />
              <span class="font-semibold">not installed</span>
            </p>

            <a
              href="https://chrome.google.com/webstore/detail/liveroom/famgmncbiedbdkgpkfdnmefhfhbgljhb"
              target="_blank"
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
        # version: "0.0.9"
        version: assigns.version
      )

    {:ok, socket}
  end

  ### Helpers

  def fetch_extension_version! do
    # TODO:
  end
end
