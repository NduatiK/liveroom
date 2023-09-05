defmodule LiveroomWeb.ApiController do
  use LiveroomWeb, :controller

  alias Liveroom.Accounts

  def get_current_user(conn, %{"user_token" => user_token} = _params) do
    case Jason.decode(user_token) do
      {:ok, user_token} when is_list(user_token) ->
        user_token
        |> :erlang.list_to_binary()
        |> Accounts.get_user_by_session_token()
        |> case do
          %Liveroom.Accounts.User{} = user ->
            conn
            |> put_status(:ok)
            |> json(%{current_user: user})

          _ ->
            nil
        end

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{message: "Invalid token"})
    end
  end
end
