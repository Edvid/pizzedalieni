FROM postgres:latest as pg

WORKDIR /pg

COPY ./INIT.sql /docker-entrypoint-initdb.d/INIT.sql
