defmodule LiveroomWeb.ConnectedLive do
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    connected
    <p :if={@email}><%= @email %></p>
    <p :if={@name}><%= @name %></p>
    <img :if={@picture_url} src={@picture_url} width="100px" />
    """
  end

  ### Components

  ### Server

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(params, _uri, socket) do
    socket =
      assign(socket,
        email: params["email"],
        name: params["name"],
        picture_url: params["picture_url"]
      )

    {:noreply, socket}
  end
end
