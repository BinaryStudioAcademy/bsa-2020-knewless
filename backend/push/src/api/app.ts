import { createExpressServer  } from 'routing-controllers';
import { Express } from 'express';
import bodyParser from 'body-parser';

const app: Express = createExpressServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
