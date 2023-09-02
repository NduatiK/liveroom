defmodule Liveroom.Repo.Local.Migrations.AddWebsiteUrlToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :website_url, :string, null: true
    end
  end
end
