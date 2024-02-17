docker-compose down -t 0
source ./.env
echo NEXT_PUBLIC_API_URL=$API_URL >> ./website/.env.local
docker-compose up -d --build
