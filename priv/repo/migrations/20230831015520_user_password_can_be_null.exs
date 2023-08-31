defmodule Liveroom.Repo.Migrations.UserPasswordCanBeNull do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :hashed_password, :string, null: true
    end
  end
end
