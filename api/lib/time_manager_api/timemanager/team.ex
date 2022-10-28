defmodule TimeManagerApi.Timemanager.Team do
  use Ecto.Schema
  import Ecto.Changeset

  schema "teams" do
    field :name, :string
    field :owner, :id
    has_many :members, TimeManagerApi.Timemanager.User
    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name, :owner])
    |> validate_required([:name, :owner])
    |> unique_constraint(:name)
    |> foreign_key_constraint(:owner)
  end
end
