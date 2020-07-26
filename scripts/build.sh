#/bin/bash
cd ..

docker build -f .docker/api.DockerFile -t api .
docker build -f .docker/client.DockerFile -t client .

docker system prune -f
