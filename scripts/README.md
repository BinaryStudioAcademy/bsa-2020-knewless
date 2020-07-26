# Knewless | CI/CD

## Build

To build all containers use

```
./build.sh
```

## Deploy

To run all containers use 

```
./deploy.sh
```

To run all containers with logs go to .docker folder and use

```
docker-compose up
```

## Configuration

Before running containers make sure to create `.env` folder in the root with a list of files:
- `api.env` - contains all properties for WebAPI application. Make sure to set correct user's credentials
- `api-db.env` - contains default DB parameters. Set default user name and password. If you can't login with default user's credentials check the DB access or recreate the volume
```
docker volume ls
docker volume rm <name> 
```
- `client.env` - contains all properties for frontend application 
- `rabbitmq.env` - contains RabbitMQ settings. Make sure to set correct user's credentials

Default ports:
- `client` - :80
- `api` - :5000
- `rabbitmq` - :5672
- `api-db` - :5432
