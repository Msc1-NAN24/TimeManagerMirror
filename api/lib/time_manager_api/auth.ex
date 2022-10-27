defmodule TimeManagerApi.Auth do
  @salt "hello_world"
  @token_age_secs 14 * 86_400
  alias TimeManagerApi.Timemanager.User



  def hash_password(password) do
    IO.inspect password
    Phoenix.Token.encrypt(TimeManagerApiWeb.Endpoint, @salt, password)
  end

  def sign(data) do
    Phoenix.Token.sign(TimeManagerApiWeb.Endpoint, @salt, data)
  end

  def verify(user, password) do
    with {:ok, decryptedPassword} <- decryptedPassword = Phoenix.Token.decrypt(TimeManagerApiWeb.Endpoint, @salt, user.password) do
      if password == decryptedPassword do
        true
      else
        false
      end
    else {:error, changeset} -> raise "Can't decrypt password !"
    end
  end

  def verify(data) do
    case Phoenix.Token.verify(TimeManagerApiWeb.Endpoint, @salt, data, max_age: @token_age_secs) do
      {:ok, data} -> {:ok, data}
      _error -> {:error, :unauthenticated}
    end
  end
end