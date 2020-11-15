import * as express from 'express';
import { KrogerTokenResponse } from '../types/Kroger';
import { getToken } from './token.helpers';
const router = express.Router();

router.get(
  '/',
  async (req: Request, res: express.Response): Promise<KrogerTokenResponse> => {
    const tokenResponse = await getToken();
    const result = {
      body: {
        ...tokenResponse,
        statusCode: 200,
      },
    };
    return res.status(res.statusCode).json(result.body);
  },
);

export default router;
