defmodule LiveroomWeb.Components.CheckClientInstallation do
  use LiveroomWeb, :live_component

  alias LiveroomWeb.Components.Banner

  @impl true
  def render(assigns) do
    ~H"""
    <%!-- Super weird, Liveview throws an error if I don't wrap the banner in a span. --%>
    <span>
      <Banner.render version={@version} latest_version="0.0.22" installed="installed on your website">
        <:when_no_version>
          <div class="flex justify-between items-center mb-4">
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
                id="copy_script_tag"
                phx-hook="CopyToClipboardButtonHook"
                data-tocopy={@script_tag_text}
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

          <p class="group text-xs font-bold bg-white outline outline-amber-600/10 rounded pt-1 pb-6 px-6 whitespace-pre-line">
            <code class="select-all"><%= @script_tag_text %></code>
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
        version: assigns.version,
        script_tag_text:
          """
          <script
            type="module"
            src="https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.22/dist/main.min.js"
          ></script>
          """
          |> String.trim()
      )

    {:ok, socket}
  end
end
