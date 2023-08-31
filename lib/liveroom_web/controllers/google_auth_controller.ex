defmodule LiveroomWeb.GoogleAuthController do
  use LiveroomWeb, :controller

  @doc """
  `index/2` handles the callback from Google Auth API redirect.
  """
  def index(conn, %{"code" => code}) do
    {:ok, token} = ElixirAuthGoogle.get_token(code, LiveroomWeb.Endpoint.url())
    {:ok, profile} = ElixirAuthGoogle.get_user_profile(token.access_token)

    dbg(profile)

    redirect(conn,
      to:
        ~p"/connected?email=#{profile.email}&name=#{profile.name}&picture_url=#{profile.picture}"
    )
  end
end
