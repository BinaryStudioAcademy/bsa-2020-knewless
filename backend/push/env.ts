import * as dotenv from 'dotenv';
import { getOsEnv } from './src/common/utils/path.helper';

dotenv.config();

export const env = {
    app: {
        rabbitmqConnectionString: getOsEnv('RABBIT_CONNECTION'),
        rabbitmqExchangeName: getOsEnv('EXCHANGE_NAME'),
        pushQueueName: getOsEnv('PUSH_QUEUE_NAME'),
        pushRoutingKey: getOsEnv('PUSH_ROUTING_KEY'),
        tokenSecret: getOsEnv('TOKEN_SECRET'),
        port: getOsEnv('PUSH_APP')
    }
};
