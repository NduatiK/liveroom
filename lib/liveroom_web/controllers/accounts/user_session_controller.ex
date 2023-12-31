defmodule LiveroomWeb.Accounts.UserSessionController do
  use LiveroomWeb, :controller

  alias Liveroom.Accounts
  alias Liveroom.Accounts.User
  alias Liveroom.EventNotifier
  alias LiveroomWeb.Accounts.UserAuth

  def create(conn, %{"token" => token} = _params) do
    case Accounts.get_user_by_email_token(token, "magic_link") do
      %User{} = user ->
        conn
        |> put_flash(:info, "Welcome back!")
        |> UserAuth.log_in_user(user)
        |> tap(fn _ ->
          EventNotifier.emit(:user_logged_in, conn,
            email: user.email,
            picture_url: user.picture_url
          )
        end)

      _ ->
        conn
        |> put_flash(:error, "That link didn't seem to work. Please try again.")
        |> redirect(to: ~p"/login")
    end
  end

  def create(conn, %{"_action" => "magic_link"} = params) do
    %{"user" => %{"email" => email}} = params

    user =
      if user = Accounts.get_user_by_email(email) do
        user
      else
        case Accounts.register_user(%{"email" => email, "picture_url" => params["picture_url"]}) do
          {:ok, user} ->
            EventNotifier.emit(:user_registered, conn,
              email: user.email,
              picture_url: user.picture_url
            )

            Accounts.deliver_user_confirmation_instructions(
              user,
              &url(~p"/accounts/users/confirm/#{&1}")
            )

            user

          {:error, _changeset} ->
            nil
        end
      end

    user &&
      Accounts.deliver_magic_link(
        user,
        &"#{LiveroomWeb.Endpoint.url()}/login/#{&1}"
      )

    # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
    conn
    |> put_flash(:info, "One-time sign-in link sent to #{email}")
    # |> put_flash(:info, "If we find an account for #{email} we'll send a one-time sign-in link")
    |> redirect(to: ~p"/login")
  end

  def create(conn, %{"_action" => "registered"} = params) do
    create(conn, params, "Account created successfully!")
  end

  def create(conn, %{"_action" => "password_updated"} = params) do
    conn
    |> put_session(:user_return_to, ~p"/accounts/users/settings")
    |> create(params, "Password updated successfully!")
  end

  def create(conn, params) do
    create(conn, params, "Welcome back!")
  end

  defp create(conn, %{"user" => user_params}, info) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> put_flash(:info, info)
      |> UserAuth.log_in_user(user, user_params)
      |> tap(fn _ ->
        EventNotifier.emit(:user_logged_in, conn,
          email: user.email,
          picture_url: user.picture_url
        )
      end)
    else
      # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
      conn
      |> put_flash(:error, "Invalid email or password")
      |> put_flash(:email, String.slice(email, 0, 160))
      |> redirect(to: ~p"/login")
    end
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "Logged out successfully.")
    |> UserAuth.log_out_user()
  end
end
