import * as express from 'express';
import { getToken } from "./token.helpers";
const router = express.Router();

router.get(
  '/',
  async (req: Request, res: express.Response) => {
    const tokenResponse = await getToken();
    const result = {
        body: {
            ...tokenResponse
        }
    }
    res.status(res.statusCode).json(result.body);
  },
);

export default router;