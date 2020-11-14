import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const app = require('./app').default;

try {
  const port = process.env.HTTP_PORT || 3000;
  app.listen(port, () => {
    console.info(`api listening on port ${port}!`);
  });
} catch (err) {
  console.error(`API COULD NOT START: ${JSON.stringify(err)}`);
}
