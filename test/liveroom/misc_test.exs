defmodule Liveroom.MiscTest do
  use ExUnit.Case, async: true

  test "extract email & name from Google Meet" do
    string =
      """
      AF_initDataCallback({key: 'ds:8', hash: '8', data:[null,null,false,null,"b.nouvellet@gmail.com","https://lh3.googleusercontent.com/a/AAcHTtcUmuyOn-wpzUrcZcBdHE6jiaBKVTMvKfH2irtgXencu4jS\u003ds192-c-mo","Basile Nouvellet","https://accounts.google.com/AccountChooser?hl\u003dfr",null,false,false,false,true,null,null,"100475158846776362065",false,null,true,null,false,false,3,false,true,false,"https://accounts.google.com/Logout?hl\u003dfr",null,"","low","low",3,"https://accounts.google.com/ServiceLogin?ltmpl\u003dmeet\u0026osid\u003d1",true,false,true,3,false,[],"https://client-side-encryption.google.com/oidc/meet/callback","",null,[null,null,null,"https://client-side-encryption.google.com/meet/init"],true,false,[],1,2,[1],1,false,false,false], sideChannel: {}});
      """
      |> String.trim()

    email =
      string
      |> String.split(",", parts: 9)
      |> List.pop_at(-3)
      |> then(fn {raw_email, _} -> String.trim(raw_email, "\"") end)

    name =
      string
      |> String.split(",", parts: 11)
      |> List.pop_at(-3)
      |> then(fn {raw_name, _} -> String.trim(raw_name, "\"") end)

    assert email == "b.nouvellet@gmail.com"
    assert name == "Basile Nouvellet"
  end
end
