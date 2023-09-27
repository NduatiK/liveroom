defmodule LiveroomWeb.MeetSimulatorLive do
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <h1 class="font-semibold text-center mb-32">Meet simulator</h1>

    <div class="flex flex-col items-center gap-16">
      <div class="pointer-events-none">
        <video src="" class="h-72 aspect-video bg-dark-400 rounded"></video>
      </div>

      <div class="grid">
        <button data-is-muted></button>
      </div>
    </div>
    """
  end

  ### Server

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, page_title: "Meet Simulator"), layout: false}
  end
end
