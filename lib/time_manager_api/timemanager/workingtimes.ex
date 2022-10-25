defmodule TimeManagerApi.Timemanager.Workingtimes do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workingtimes" do
    field :end, :naive_datetime
    field :start, :naive_datetime
    field :user, :id

    timestamps()
  end

  @doc false
  def changeset(workingtimes, attrs) do
    workingtimes
    |> cast(attrs, [:start, :end, :user])
    |> validate_required([:start, :end, :user])
    |> foreign_key_constraint(:user)
    |> validate_format([:start, :end], ~r/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
  end
end
