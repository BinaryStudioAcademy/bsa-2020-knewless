#/bin/bash

docker build -f .docker/api.Dockerfile -t api backend/core
docker build -f .docker/fileprocessor.Dockerfile -t fileprocessor backend/fileprocessor
docker build -f .docker/emailsender.Dockerfile -t emailsender backend/emailsender
docker build -f .docker/push.Dockerfile -t push backend/push
docker build -f .docker/client.Dockerfile -t client frontend
