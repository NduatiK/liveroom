defmodule LiveroomWeb.GoogleAuthController do
  use LiveroomWeb, :controller

  alias Liveroom.Accounts
  alias LiveroomWeb.Accounts.UserAuth

  @doc """
  `index/2` handles the callback from Google Auth API redirect.
  """
  def index(conn, %{"code" => code} = params) do
    {:ok, token} = ElixirAuthGoogle.get_token(code, LiveroomWeb.Endpoint.url())
    {:ok, profile} = ElixirAuthGoogle.get_user_profile(token.access_token)

    email = profile.email

    user =
      if user = Accounts.get_user_by_email(email) do
        user
      else
        case Accounts.register_user(%{"email" => email, "picture_url" => profile.picture}) do
          {:ok, user} ->
            Accounts.deliver_user_confirmation_instructions(
              user,
              &url(~p"/accounts/users/confirm/#{&1}")
            )

            user

          {:error, _changeset} ->
            nil
        end
      end

    conn
    |> put_flash(:info, "Welcome 👋")
    |> UserAuth.log_in_user(
      user,
      %{"remember_me" => "true"},
      case params["state"] do
        "extension" ->
          ~p"/extension"

        _ ->
          nil
      end
    )
  end
end
