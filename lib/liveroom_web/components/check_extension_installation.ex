defmodule LiveroomWeb.Components.CheckExtensionInstallation do
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
      <p :if={@version}>Up and running</p>
      <p :if={!@version} class="flex items-center gap-4">Chrome extension is not installed</p>

      <a
        :if={!@version}
        href="https://chrome.google.com/webstore/detail/liveroom/famgmncbiedbdkgpkfdnmefhfhbgljhb"
        target="_blank"
        class="w-fit font-semibold group"
      >
        <.button class="flex justify-center items-center">
          Install it here
          <.icon
            name="hero-arrow-right-mini"
            class="inline-block ml-2 group-hover:translate-x-0.5 transition-transform"
          />
        </.button>
      </a>

      <p class="flex items-baseline gap-4">
        <span :if={@version} class="w-fit bg-white text-sm rounded-full py-0.5 px-2">
          version <span class="font-medium tabular-nums"><%= @version %></span>
        </span>

        <span :if={@version == "0.0.9"} class="text-sm text-indigo-600/75">
          you're up to date
        </span>
      </p>
    </div>
    """
  end

  @impl true
  def update(assigns, socket) do
    socket =
      assign(socket,
        # version: "0.0.9"
        version: assigns.version
      )

    {:ok, socket}
  end

  ### Components

  ### Helpers

  def fetch_extension_version! do
    # TODO:
  end
end
