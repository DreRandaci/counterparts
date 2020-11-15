import * as express from 'express';
import tokenRouter from './tokens/token.router';

const router = express.Router();

router.use('/access_token', tokenRouter);

export default router;
