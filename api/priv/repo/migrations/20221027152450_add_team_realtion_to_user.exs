defmodule TimeManagerApi.Repo.Migrations.AddTeamRealtionToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :team_id, references(:teams), null: true
    end
  end
end
