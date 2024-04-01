FROM node:18 as api

WORKDIR /api-app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD PASSWORD=$DB_PASSWORD JWT_SECRET=$JWT_SECRET_KEY node server.js
