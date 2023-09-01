defmodule Liveroom.Repo.Migrations.UserPasswordCanBeNull do
  use Ecto.Migration

  def change do
    # NOTE: SQLite does not support altering a column
    #       So we have to create a new table with the proper nullable field
    #       and drop the old one.

    # Rename existing table
    rename table(:users), to: table(:temp_users)
    rename table(:users_tokens), to: table(:temp_users_tokens)
    drop index(:users, [:email])
    drop index(:users_tokens, [:user_id])
    drop index(:users_tokens, [:context, :token])
    flush()

    # Create new table with nullable column
    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :email, :citext, null: false
      add :hashed_password, :string, null: true
      add :picture_url, :text, nullable: true

      add :confirmed_at, :naive_datetime

      timestamps()
    end

    create unique_index(:users, [:email])

    create table(:users_tokens, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :user_id, references(:users, type: :binary_id, on_delete: :delete_all), null: false
      add :token, :binary, null: false
      add :context, :string, null: false
      add :sent_to, :string
      timestamps(updated_at: false)
    end

    create index(:users_tokens, [:user_id])
    create unique_index(:users_tokens, [:context, :token])

    flush()

    # Copy data from old table to new one
    execute "INSERT INTO users SELECT * FROM temp_users;"
    execute "INSERT INTO users_tokens SELECT * FROM temp_users_tokens;"

    # Drop the old table
    drop table(:temp_users)
    drop table(:temp_users_tokens)
  end
end
