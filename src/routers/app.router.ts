import * as express from 'express';
import krogerRouter from './kroger/kroger.router';

// TODO: move kroger access tokens to middleware
const middleware = [];

const router = express.Router();
router.use('/kroger', middleware, krogerRouter);
router.get('/health', (req: Request, res: express.Response) => {
  res.json({
    // @ts-ignore
    hostname: req.headers.host,
    status: 'success',
    timestamp: new Date().toISOString(),
    results: [],
  });
});

export default router;
