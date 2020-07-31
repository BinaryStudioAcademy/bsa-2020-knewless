#/bin/bash

docker build -f .docker/api.Dockerfile -t api .
docker build -f .docker/client.Dockerfile -t client .

# TODO: add push

# TODO: add ssh login/run deploy remotely
