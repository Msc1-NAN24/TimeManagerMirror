defmodule TimeManagerApiWeb.UserView do
  use TimeManagerApiWeb, :view
  alias TimeManagerApiWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      rank: user.rank,
    }
  end

  def render("manager.json", %{user: user}) do
    %{
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      insert_at: user.inserted_at,
      updated_at: user.updated_at,
      rank: user.rank,
    }
  end

end
