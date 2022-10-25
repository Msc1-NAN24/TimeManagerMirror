#!/bin/bash
mix local.hex --force ; mix ecto.migrate ; mix phx.server