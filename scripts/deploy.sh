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

scp -r ./.docker/nginx $vm_user@$server_ip:~/.docker/nginx
scp ./.docker/docker-compose.yml $vm_user@$server_ip:~/.docker

ssh $vm_user@$server_ip "sudo docker pull bsa2020knewless/dockerhub:api"
ssh $vm_user@$server_ip "sudo docker pull bsa2020knewless/dockerhub:fileprocessor"
ssh $vm_user@$server_ip "sudo docker pull bsa2020knewless/dockerhub:emailsender"
ssh $vm_user@$server_ip "sudo docker pull bsa2020knewless/dockerhub:push"
ssh $vm_user@$server_ip "sudo docker pull bsa2020knewless/dockerhub:client"
ssh $vm_user@$server_ip "sudo docker-compose -f ~/.docker/docker-compose.yml up -d"
