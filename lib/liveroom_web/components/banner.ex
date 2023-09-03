defmodule LiveroomWeb.Components.Banner do
  use LiveroomWeb, :html

  attr :version, :string, required: true
  attr :latest_version, :string, required: true
  attr :class, :string, default: nil

  slot :when_no_version, required: true

  def render(assigns) do
    ~H"""
    <div
      data-hasversion={if @version, do: "true", else: "false"}
      class={[
        "flex flex-col gap-4",
        "p-4 shadow-xl shadow-indigo-950/5",
        "outline outline-indigo-600/10",
        "bg-gradient-to-br from-indigo-400/5 via-indigo-400/10 to-indigo-400/20",
        "text-brand rounded-lg",
        "data-[hasversion=false]:shadow-amber-950/5",
        "data-[hasversion=false]:outline-amber-600/10",
        "data-[hasversion=false]:from-amber-400/5 data-[hasversion=false]:via-amber-400/10 data-[hasversion=false]:to-amber-400/20",
        "data-[hasversion=false]:shadow-md",
        @class
      ]}
    >
      <%= if !@version do %>
        <%= render_slot(@when_no_version) %>
      <% end %>

      <div :if={@version} class="flex justify-between items-center">
        <p class="flex items-center gap-1.5 text-indigo-600">
          <.icon name="hero-check-badge-mini" class="mt-0.5 h-5 w-5" />
          <span class="font-semibold">up and running</span>
        </p>

        <p class="flex items-baseline gap-2">
          <span
            :if={@version in [@latest_version, "#{@latest_version}.dev"]}
            class="text-sm text-indigo-600/50"
          >
            you're up to date
          </span>

          <span class="w-fit bg-white text-sm rounded-full py-0.5 px-2">
            version <span class="font-semibold"><%= @version %></span>
          </span>
        </p>
      </div>
    </div>
    """
  end
end
