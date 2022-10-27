defmodule TimeManagerApi.Timemanager.Workingtimes do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workingtimes" do
    field :end, :utc_datetime_usec
    field :start, :utc_datetime_usec
    field :user, :id

    timestamps()
  end

  @doc false
  def changeset(workingtimes, attrs) do
    workingtimes
    |> cast(attrs, [:start, :end, :user])
    |> validate_required([:start, :end, :user])
    |> validate_format(:start, ~r/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    |> validate_format(:end, ~r/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    |> foreign_key_constraint(:user)
  end
end
