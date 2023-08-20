defmodule LiveroomWeb.AdminLiveTest do
  use LiveroomWeb.ConnCase, async: true

  test "renders page", %{conn: conn} do
    {:ok, _view, html} = live(conn, ~p"/room/public/admin")

    assert html =~ "Welcome"
  end

  test "renders 2 pages in same room_id" do
    conn_1 =
      Phoenix.ConnTest.build_conn()
      |> put_connect_params(%{"inner_width" => 500, "inner_height" => 500})

    conn_2 =
      Phoenix.ConnTest.build_conn()
      |> put_connect_params(%{"inner_width" => 500, "inner_height" => 500})

    {:ok, _live_1, _html} = live(conn_1, ~p"/room/public/admin")
    {:ok, _live_2, _html} = live(conn_2, ~p"/room/public/admin")
  end
end
