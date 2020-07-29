#/bin/bash

docker build -f .docker/api.Dockerfile -t api .
docker build -f .docker/client.Dockerfile -t client .

docker system prune -f
