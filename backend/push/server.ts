import app from './src/api/app'
import * as http from 'http';
import { env } from './env';
import { socketService } from './src/websockets/socket.service';
import { pushQueueHandler } from './src/messaging/queue.handlers';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: [env.app.bootstrapAddress],
  retry: {
    initialRetryTime: 500,
    retries: 20
  }
});


const server: http.Server = http.createServer(app);

socketService.create(server);

server.listen(env.app.port, async () => {
    console.log(`Server started on ${env.app.port}`);

    const consumer = kafka.consumer({ groupId: env.app.consumerGroup });
    await consumer.connect();
    await consumer.subscribe({ topic: env.app.notificationsTopic });
    
    await consumer.run({
      eachMessage: async ({ message }) => {
        pushQueueHandler(message.value.toString());
      },
    })
});
