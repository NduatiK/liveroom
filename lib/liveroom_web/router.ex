defmodule LiveroomWeb.Router do
  use LiveroomWeb, :router

  import LiveroomWeb.Accounts.UserAuth

  import Phoenix.LiveDashboard.Router

  alias LiveroomWeb.Hooks
  alias LiveroomWeb.Plugs

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {LiveroomWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
    # no plug Plugs.Analytics, it is handled by a Liveview hook on mount
  end

  pipeline :admins_only do
    plug :admin_basic_auth
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :analytics do
    plug Plugs.Analytics
  end

  pipeline :client do
    plug CORSPlug
  end

  scope "/", LiveroomWeb do
    pipe_through :browser

    live_session :default, on_mount: [Hooks.Analytics] do
      live "/privacy", PrivacyPolicyLive, :index
      live "/connected", ConnectedLive, :index
    end

    live_session :landing,
      on_mount: [
        Hooks.Analytics,
        {Hooks.Liveroom, %{type: :client, room_id: "public"}}
      ] do
      live "/", HomeLive, :index
    end

    live_session :_liveroom_admin,
      on_mount: [
        Hooks.Analytics,
        {Hooks.Liveroom, %{type: :admin}}
      ] do
      live "/room/:room_id/admin", AdminLive
    end

    live_session :_liveroom_client,
      on_mount: [
        Hooks.Analytics,
        {Hooks.Liveroom, %{type: :client}}
      ] do
      live "/room/:room_id/client", ClientLive
    end

    # Auth
    get "/auth/google/callback", GoogleAuthController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", LiveroomWeb do
  #   pipe_through :api
  # end

  # Admin
  scope "/_admin", LiveroomWeb do
    pipe_through :browser
    if Mix.env() == :prod, do: pipe_through(:admins_only)

    live_dashboard "/dashboard", metrics: LiveroomWeb.Telemetry
  end

  # Enable Swoosh mailbox preview in development
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  ### Plugs

  defp admin_basic_auth(conn, _opts) do
    username = Application.fetch_env!(:liveroom, :admin_basic_auth)[:username]
    password = Application.fetch_env!(:liveroom, :admin_basic_auth)[:password]

    Plug.BasicAuth.basic_auth(conn, username: username, password: password)
  end

  ## Authentication routes

  scope "/", LiveroomWeb.Accounts, as: :accounts do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    live_session :redirect_if_user_is_authenticated,
      on_mount: [{LiveroomWeb.Accounts.UserAuth, :redirect_if_user_is_authenticated}] do
      live "/register", UserRegistrationLive, :new
      live "/log_in", UserLoginLive, :new
      live "/reset_password", UserForgotPasswordLive, :new
      live "/reset_password/:token", UserResetPasswordLive, :edit
    end

    post "/log_in", UserSessionController, :create
  end

  scope "/accounts", LiveroomWeb.Accounts, as: :accounts do
    pipe_through [:browser, :require_authenticated_user]

    live_session :require_authenticated_user,
      on_mount: [{LiveroomWeb.Accounts.UserAuth, :ensure_authenticated}] do
      live "/users/settings", UserSettingsLive, :edit
      live "/users/settings/confirm_email/:token", UserSettingsLive, :confirm_email
    end
  end

  scope "/accounts", LiveroomWeb.Accounts, as: :accounts do
    pipe_through [:browser]

    delete "/users/log_out", UserSessionController, :delete

    live_session :current_user,
      on_mount: [{LiveroomWeb.Accounts.UserAuth, :mount_current_user}] do
      live "/users/confirm/:token", UserConfirmationLive, :edit
      live "/users/confirm", UserConfirmationInstructionsLive, :new
    end
  end
end
