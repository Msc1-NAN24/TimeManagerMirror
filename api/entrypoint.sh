#!/bin/bash

# Create and migrate the database
mix ecto.create
mix ecto.migrate

# Start the Phoenix server
mix phx.server
