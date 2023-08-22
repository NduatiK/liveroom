defmodule Liveroom.Repo.Migrations.AddPictureUrlToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :picture_url, :text, nullable: true
    end
  end
end
