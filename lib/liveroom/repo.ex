defmodule Liveroom.Repo.Local do
  use Ecto.Repo,
    otp_app: :liveroom,
    adapter: Ecto.Adapters.SQLite3
end

defmodule Liveroom.Repo do
  use Litefs.Repo, local_repo: Liveroom.Repo.Local
end

# defmodule Liveroom.Repo do
#   use Ecto.Repo,
#     otp_app: :liveroom,
#     adapter: Ecto.Adapters.Postgres
# end
