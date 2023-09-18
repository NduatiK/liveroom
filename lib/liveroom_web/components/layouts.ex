defmodule LiveroomWeb.Layouts do
  use LiveroomWeb, :html

  def render("empty.html", assigns) do
    ~H"""
    <div class="relative min-h-[100dvh] grid grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden">
      <.flash_group flash={@flash} />

      <main class="h-full flex flex-col items-center overflow-x-hidden">
        <%= @inner_content %>
      </main>
    </div>
    """
  end

  def render("app.html", assigns) do
    ~H"""
    <div class="relative min-h-[100dvh] grid grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden">
      <.flash_group flash={@flash} />

      <header class="w-full flex justify-between items-center gap-4 py-4 px-4 md:px-8 mb-4 md:mb-8">
        <%!-- liveroom logo --%>
        <.link
          navigate={~p"/"}
          class="flex items-center pr-2 font-semibold rounded-md hover:bg-dark-200/60 transition-colors"
        >
          <img
            src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/liveroom_logo.png"}
            class="w-10 h-10 pt-1"
          />
          <span class="text-xl font-bold text-accent">Liveroom</span>
        </.link>

        <div
          :if={@current_user}
          class="flex flex-wrap justify-between items-center gap-y-4 gap-x-2 md:gap-x-8"
        >
          <%!-- log out --%>
          <.link
            href={~p"/accounts/users/log_out"}
            method="delete"
            class="hover:bg-dark-200/60 py-1 px-2 font-medium rounded transition-colors"
          >
            Log&nbsp;out
          </.link>

          <.link
            navigate={~p"/connected"}
            class="flex items-center gap-2 hover:bg-dark-200/60 py-1 pl-2 pr-1 rounded transition-colors group"
          >
            <%!-- user email --%>
            <p :if={@current_user.email} class="hidden md:block font-medium select-none">
              <%= @current_user.email %>
            </p>

            <%!-- user picture --%>
            <img
              :if={@current_user.picture_url}
              src={@current_user.picture_url}
              width="25px"
              class="rounded-sm group-hover:opacity-95 transition-opacity"
              referrerpolicy="no-referrer"
            />
            <div
              :if={!@current_user.picture_url && @current_user.email}
              class="w-[25px] aspect-square flex justify-center items-center bg-dark-800 text-white text-sm font-semibold rounded-sm uppercase group-hover:opacity-95 transition-opacity"
            >
              <%= String.at(@current_user.email, 0) %>
            </div>
          </.link>
        </div>
      </header>

      <main class="h-full flex flex-col items-center overflow-x-hidden">
        <%= @inner_content %>
      </main>
    </div>
    """
  end

  def render("root.html", assigns) do
    ~H"""
    <!DOCTYPE html>
    <html lang="en" style="scrollbar-gutter: stable;">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content={get_csrf_token()} />

        <meta name="theme-color" content="#111827" />
        <meta name="description" content="Collaborate live with your users." />

        <%!-- NOTE: Check rendering with https://socialsharepreview.com --%>

        <%!-- Facebook Open Graph meta tags --%>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={assigns[:page_title] || "Liveroom"} />
        <meta
          property="og:description"
          content={assigns[:page_description] || "Collaborate live with your users."}
        />
        <meta property="og:url" content={assigns[:current_url] || "https://liveroom.app"} />
        <meta
          property="og:image"
          content={
            assigns[:page_image] ||
              LiveroomWeb.Endpoint.static_url() <> ~p"/images/liveroom_og_image.jpg"
          }
        />

        <%!-- Twitter Card meta tags --%>
        <meta name="twitter:card" content={assigns[:page_twitter_card] || "summary_large_image"} />
        <meta name="twitter:domain" content="liveroom.app" />

        <.live_title><%= assigns[:page_title] || "Liveroom" %></.live_title>

        <%!-- <link rel="manifest" href={~p"/manifest.json"} /> --%>
        <link rel="icon" href={~p"/favicon.ico"} sizes="any" />
        <%!-- <link rel="icon" href={~p"/images/icons/icon.svg"} type="image/svg+xml" /> --%>
        <link rel="apple-touch-icon" href={~p"/images/icons/apple-touch-icon.png"} />

        <link phx-track-static rel="stylesheet" href={~p"/assets/app.css"} />

        <script defer phx-track-static type="text/javascript" src={~p"/assets/app.js"}>
        </script>
      </head>

      <body class="h-full bg-background antialiased">
        <%= @inner_content %>
      </body>
    </html>
    """
  end
end
