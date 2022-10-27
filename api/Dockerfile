FROM elixir:latest

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY .. /app

EXPOSE 4000

WORKDIR /app
ENTRYPOINT ["/docker-entrypoint.sh"]