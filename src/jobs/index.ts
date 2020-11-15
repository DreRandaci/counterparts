import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
import schedule from 'node-schedule';
import { getManager } from 'typeorm';
import { CronJob } from '../entities/CronJob';
import { getKrogerAccessToken, getKrogerProducts } from './cronJob.helpers';
import { Product } from '../entities/Product';
import { KrogerProduct } from 'src/routers/kroger/types/Kroger';

interface FormattedProduct extends Product {}

export const refreshProductsJob = () => {
  // run job every minute
  schedule.scheduleJob('*/1 * * * *', async () => {
    try {
      const job = await getManager()
        .createQueryBuilder(CronJob, 'CronJob')
        .getOne();

      if (!job) {
        // no record exists, insert (should only have 1)
        return await insertCronJob();
      }

      const response = await getKrogerAccessToken();
      const productsResponse = await getKrogerProducts(response.access_token);
      const products = formatProducts(productsResponse.data);

      const arbitraryAmountOfProducts = 5;
      if (products.length > arbitraryAmountOfProducts) {
        console.log('refreshing products...');
        await deleteProductsFromDb();
      }

      console.log(productsResponse);
      console.log('inserting new records...');
      await insertProducts(products);

      // refresh scheduled job
      console.log('updating record cron job...');
      return await updateJobLastExecution();
    } catch (error) {
      console.error(error);
    }
  });

  console.log('cron job started');
};

const insertCronJob = async (): Promise<void> => {
  await getManager()
    .createQueryBuilder()
    .insert()
    .into(CronJob)
    .values({})
    .execute();
};

const insertProducts = async (
  products: Array<FormattedProduct>,
): Promise<void> => {
  await getManager()
    .createQueryBuilder()
    .insert()
    .into(Product)
    .values(products)
    .execute();
};

const updateJobLastExecution = async (): Promise<void> => {
  await getManager().createQueryBuilder().update(CronJob).set({}).execute();
};

const deleteProductsFromDb = async (): Promise<void> => {
  await getManager().createQueryBuilder().delete().from(Product).execute();
};

const formatProducts = (
  products: Array<KrogerProduct>,
): Array<FormattedProduct> => {
  const formattedProducts = products
    .filter((prod) => prod?.items[0]?.price?.regular)
    .map((prod) => {
      return {
        id: null,
        productId: prod.productId,
        brand: prod.brand,
        category: prod.categories[0],
        description: prod.description,
        imageUrl: JSON.stringify(prod.images),
        price: prod?.items[0]?.price?.regular,
        source: 'kroger',
      } as FormattedProduct;
    });
  return formattedProducts;
};
