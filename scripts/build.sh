#/bin/bash

docker build -f .docker/api.Dockerfile -t api .
docker build -f .docker/client.Dockerfile -t client .

docker login -u $docker_user -p $docker_pass

docker tag api:latest bsa2020knewless/dockerhub:api
docker tag client:latest bsa2020knewless/dockerhub:client

docker push bsa2020knewless/dockerhub:api
docker push bsa2020knewless/dockerhub:client

scp -r ./.docker $vm_user@$server_ip:~/.docker
scp ./scripts/deploy.sh $vm_user@$server_ip:~/scripts

ssh $vm_user@$server_ip "sudo sh ~/scripts/deploy.sh"
