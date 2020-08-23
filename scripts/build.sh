#/bin/bash

docker build -f .docker/api.Dockerfile -t api backend/core
docker build -f .docker/fileprocessor.Dockerfile -t fileprocessor backend/fileprocessor
docker build -f .docker/emailsender.Dockerfile -t emailsender backend/emailsender
docker build -f .docker/push.Dockerfile -t push backend/push
docker build -f .docker/client.Dockerfile -t client frontend

docker login -u $docker_user -p $docker_pass

docker tag api:latest bsa2020knewless/dockerhub:api
docker tag fileprocessor:latest bsa2020knewless/dockerhub:fileprocessor
docker tag emailsender:latest bsa2020knewless/dockerhub:emailsender
docker tag push:latest bsa2020knewless/dockerhub:push
docker tag client:latest bsa2020knewless/dockerhub:client

docker push bsa2020knewless/dockerhub:api
docker push bsa2020knewless/dockerhub:fileprocessor
docker push bsa2020knewless/dockerhub:emailsender
docker push bsa2020knewless/dockerhub:push
docker push bsa2020knewless/dockerhub:client
