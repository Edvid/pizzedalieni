docker-compose down -t 0
export $(cat .env | xargs) && echo NEXT_PUBLIC_API_URL=$API_URL >> ./website/.env.local
docker-compose up -d --build
