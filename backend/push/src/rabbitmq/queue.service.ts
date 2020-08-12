import amqp from 'amqplib'
import { Service } from 'typedi';
import promiseRetry from 'promise-retry';

@Service()
class Queue {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    dispose = async () => {
        await this.connection.close();
        console.log('disposed')
    }
    listen = async (queueName: string, handler: (msg: string) => void, exchangeName: string, routingKey: string) => {
        await this.initializeQueue(queueName, exchangeName, routingKey);
        this.addConsumer(queueName, handler)
    }

    async initializeConnection(connectionString: string) {
        this.connection = await amqp.connect(connectionString);
        this.channel = await this.connection.createChannel();  
        this.addEvents();  
    }

    private addConsumer = (queueName: string, handler: (msg: string) => void) => {
        this.channel.consume(queueName, (msg: any) => {
            handler(msg.content.toString());
            return this.channel.ack(msg);
        });
    }

    private async initializeQueue(queue_name: string, exchange_name: string, routingKey: string) {
        this.channel.assertQueue(queue_name, { durable: true });
        if(exchange_name) {
            this.channel.assertExchange(exchange_name, 'topic', {durable: true})
            this.channel.bindQueue(queue_name, exchange_name, routingKey);
        }
        await this.channel.prefetch(1);
    }
    private async addEvents() {
        this.channel.on("close", (err: any) => {
            console.log(err);
        });
        this.channel.on("error", (err: any) => {
            console.log(err);
        });
    }
}

export const createQueueConnection = (connectionString: string): Promise<Queue> => {
    const queue = new Queue();
    return promiseRetry(retry => queue.initializeConnection(connectionString).catch(retry))
        .then(() => queue);
}
