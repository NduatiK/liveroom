defmodule LiveroomWeb.Presence do
  @moduledoc """
  Provides presence tracking to channels and processes.

  See the [`Phoenix.Presence`](https://hexdocs.pm/phoenix/Phoenix.Presence.html)
  docs for more details.
  """
  alias Liveroom.EventNotifier

  use Phoenix.Presence,
    otp_app: :liveroom,
    pubsub_server: Liveroom.PubSub

  ### API

  def create_user(
        room_id,
        type,
        analytics_data \\ %{
          url: "not found",
          inner_width: 0,
          inner_height: 0
        },
        user_name \\ nil,
        initial_mouse_x \\ nil,
        initial_mouse_y \\ nil
      )
      when is_binary(room_id) and room_id != "" and
             type in [:client, :admin] and
             (user_name == nil or (is_binary(user_name) and user_name != "")) do
    %{
      id: Ecto.UUID.generate(),
      room_id: room_id,
      # :phx_ref added by Presence
      # :phx_ref_prev added by Presence
      type: type,
      name: user_name || Liveroom.Names.generate(),
      color: Liveroom.Colors.get_random_color(),
      joined_at: DateTime.utc_now(),
      analytics_data: analytics_data,
      current_url: analytics_data.url,
      inner_width: analytics_data.inner_width,
      inner_height: analytics_data.inner_height,
      # NOTE: Sent as string through the websockets, and used in template strings in style or css,
      #       so let's not take the performance penalty of converting it to integer.
      x: initial_mouse_x || "50",
      y: initial_mouse_y || "50",
      msg: "",
      is_mouse_down: false,
      is_shift_key_down: false,
      hovered_elements: %{},
      focused_elements: %{},
      inputs: %{},
      _connected_node: Node.self()
    }
  end

  def list_users(room_id) when is_binary(room_id) and room_id != "" do
    topic = topic(room_id)

    for {user_id, %{metas: metas}} <- list(topic), into: %{} do
      {user_id, hd(metas)}
    end
  end

  def update_user(room_id, user_id, update_fn)
      when is_binary(room_id) and room_id != "" and
             is_binary(user_id) and user_id != "" and
             is_function(update_fn, 1) do
    update(self(), topic(room_id), user_id, update_fn)
  end

  def join_room(room_id, user) when is_binary(room_id) and room_id != "" and is_map(user) do
    topic = topic(room_id)

    {:ok, _} = track(self(), topic, user.id, user)
    :ok = LiveroomWeb.Endpoint.subscribe(topic)

    EventNotifier.emit(
      :user_joined_room,
      user.analytics_data,
      room_id: room_id,
      analytics_data: user.analytics_data,
      n_of_users: map_size(list(topic(room_id)))
    )

    :ok
  end

  def topic(room_id) when is_binary(room_id) and room_id != "" do
    "liveroom:#{room_id}"
  end

  def merge_joins_and_leaves(users, joins, leaves) when is_map(users) do
    users
    # NOTE: ⚠️ Order is important, first we remove the leaves, then we add the joins.
    |> merge_leaves(leaves)
    |> merge_joins(joins)
  end

  def broadcast(room_id, event, payload)
      when is_binary(room_id) and room_id != "" and
             is_binary(event) and event != "" do
    LiveroomWeb.Endpoint.broadcast(topic(room_id), event, payload)
  end

  ### Server

  def init(_opts) do
    {:ok, %{}}
  end

  def handle_metas(_topic, %{joins: joins, leaves: leaves}, presences, state) do
    n_of_users = map_size(presences)

    users_ids_joins = Map.keys(joins)
    users_ids_leaves = Map.keys(leaves)
    users_ids_left = users_ids_leaves -- users_ids_joins

    for user_id <- users_ids_left do
      user = hd(leaves[user_id].metas)

      # NOTE: In production, we run in a cluster.
      #       We need to make sure the event is sent only once.
      #       Only by the node the user is connected to.
      if user._connected_node == Node.self() do
        EventNotifier.emit(
          :user_left_room,
          user.analytics_data,
          room_id: user.room_id,
          analytics_data: user.analytics_data,
          n_of_users: n_of_users
        )
      end
    end

    {:ok, state}
  end

  ### Helpers

  defp merge_joins(users, joins) do
    for {user_id, %{metas: metas}} <- joins, reduce: users do
      users -> Map.put(users, user_id, hd(metas))
    end
  end

  defp merge_leaves(users, leaves) do
    for {user_id, %{metas: _metas}} <- leaves, reduce: users do
      users -> Map.delete(users, user_id)
    end
  end
end
