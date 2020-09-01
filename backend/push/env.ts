import * as dotenv from 'dotenv';
import { getOsEnv } from './src/common/utils/path.helper';

dotenv.config();

export const env = {
    app: {
        tokenSecret: getOsEnv('TOKEN_SECRET'),
        port: getOsEnv('PUSH_APP'),
        bootstrapAddress: getOsEnv('BOOTSTRAP_ADDRESS'),
        consumerGroup: getOsEnv('CONSUMER_GROUP'),
        notificationsTopic: getOsEnv('NOTIFICATIONS_TOPIC')
    }
};
