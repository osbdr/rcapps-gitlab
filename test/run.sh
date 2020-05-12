#!/bin/bash

docker-compose down
docker-compose up -d

while ! curl -s http://localhost:3000
do
  echo "$(date) - still trying"
  sleep 10
done
echo "$(date) - connected successfully"

cd ..
rc-apps deploy --url=http://localhost:3000 -u=admin -p=supersecret
cd test
cd app
npm test

