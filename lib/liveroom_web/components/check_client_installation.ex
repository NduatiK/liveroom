defmodule LiveroomWeb.Components.CheckClientInstallation do
  use LiveroomWeb, :live_component

  attr :class, :string, default: nil

  @impl true
  def render(assigns) do
    ~H"""
    <div
      data-hasversion={if @version, do: "true", else: "false"}
      class={[
        "p-6 shadow-md shadow-indigo-400/10 border-4 border-indigo-400/10 bg-indigo-400/10 text-brand rounded-3xl flex flex-col gap-4",
        "data-[hasversion=false]:bg-white data-[hasversion=false]:border-zinc-400/10 data-[hasversion=false]:shadow-md",
        @class
      ]}
    >
      <p :if={@version} class="flex items-center gap-2">Up and running</p>
      <p :if={!@version}>Client not installed</p>

      <p :if={!@version}>
        <span class="mb-4 block">
          Copy the following code in the <%= "<head>" %> HTML tag of your website:
        </span>
        <div class="group text-xs font-semibold bg-zinc-100 rounded pt-0 pb-4 px-6 whitespace-pre-line">
          <code>
            <%= ~s{
    <script
    type="module"
    src="https://cdn.jsdelivr.net/npm/liveroom-client-element@0.0.20/dist/main.min.js"
    ></script>
            } |> String.trim() %>
          </code>
        </div>
      </p>

      <p class="flex items-baseline gap-4">
        <span :if={@version} class="w-fit bg-white text-sm rounded-full py-0.5 px-2">
          version <span class="font-medium tabular-nums"><%= @version %></span>
        </span>

        <span :if={@version == "0.0.20"} class="text-sm text-indigo-600/75">
          you're up to date
        </span>
      </p>
    </div>
    """
  end

  @impl true
  def update(assigns, socket) do
    socket = assign(socket, version: assigns.version)
    {:ok, socket}
  end

  ### Components

  ### Helpers
end
