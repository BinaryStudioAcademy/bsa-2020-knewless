import app from './src/api/app'
import * as http from 'http';
import { env } from './env';
import { socketService } from './src/websockets/socket.service';
import { createQueueConnection } from './src/rabbitmq/queue.service';
import { pushQueueHandler } from './src/rabbitmq/queue.handlers';

const server: http.Server = http.createServer(app);

socketService.create(server);

server.listen(env.app.port, async () => {
    const queue = await createQueueConnection(env.app.rabbitmqConnectionString);
    queue.listen(env.app.pushQueueName, pushQueueHandler, env.app.rabbitmqExchangeName, env.app.pushRoutingKey);
    console.log('Server started');
});
