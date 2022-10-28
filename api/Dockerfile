FROM elixir:latest

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY . /app

ARG API_PORT

EXPOSE ${API_PORT}

WORKDIR /app

RUN mix local.hex --force
RUN mix local.rebar --force

ENTRYPOINT ["/docker-entrypoint.sh"]