FROM node:18 as api

COPY . .

EXPOSE 3001
CMD PASSWORD=$DB_PASSWORD node server.js
