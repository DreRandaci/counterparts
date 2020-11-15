import express from 'express';
import router from './routers/app.router';

const app = express();

app.use('/', router);

export default app;
