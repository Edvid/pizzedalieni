#!/bin/bash

docker compose down -t 0
source ./.env
echo NEXT_PUBLIC_API_URL=$API_URL > ./website/.env.local
docker compose -f docker-compose-dev.yaml up -d --build
cd website
npm run dev
