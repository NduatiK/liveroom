defmodule LiveroomWeb.Components.CheckClientInstallation do
  use LiveroomWeb, :live_component

  alias LiveroomWeb.Components.Banner

  @impl true
  def render(assigns) do
    ~H"""
    <%!-- Super weird, Liveview throws an error if I don't wrap the banner in a span. --%>
    <span>
      <Banner.render version={@version} latest_version="0.0.20" installed="installed on your website">
        <:when_no_version>
          <div class="flex justify-between items-center">
            <p class="flex items-center gap-1.5 text-amber-600">
              <.icon name="hero-exclamation-triangle-mini" class="mt-0.5 h-5 w-5" />
              <span class="font-semibold">not installed</span>
            </p>

            <div class="flex items-center gap-4">
              <.button
                phx-click="refresh_client_version"
                class="flex justify-center items-center group !text-zinc-800 !bg-transparent hover:!bg-white"
              >
                Check again <.icon name="hero-arrow-path-mini" class="inline-block ml-2 h-4 w-4" />
              </.button>

              <.button
                phx-click="refresh_client_version"
                class="flex justify-center items-center group"
              >
                Copy <.icon name="hero-clipboard-mini" class="inline-block ml-2 h-4 w-4" />
              </.button>
            </div>
          </div>

          <p>
            copy the following code in the <span class="font-semibold">&lt;head&gt;</span>
            HTML tag of your website
          </p>

          <p class="group text-xs font-bold bg-white outline outline-amber-600/10 rounded pt-1 pb-6 px-6 whitespace-pre-line">
            <code class="select-all"><%= ~s{
                <script
                  type="module"
                  src="https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.20/dist/main.min.js"
                ></script>
              } |> String.trim() %></code>
          </p>
        </:when_no_version>
      </Banner.render>
    </span>
    """
  end

  @impl true
  def update(assigns, socket) do
    socket =
      assign(socket,
        version: assigns.version
      )

    {:ok, socket}
  end
end
