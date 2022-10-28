FROM elixir:latest

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY .. /app

ARG PORT

EXPOSE ${PORT}

WORKDIR /app



ENTRYPOINT ["/docker-entrypoint.sh"]