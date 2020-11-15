import { Product } from 'src/entities/Product';

export interface KrogerServiceToken {
  expires_in: number;
  access_token: string;
  token_type: string;
}

export interface KrogerTokenResponse extends KrogerServiceToken {
  statusCode: number;
}

export interface KrogerProductsList {
  data: Array<KrogerProduct>;
}

export interface KrogerProduct {
  productId: string;
  brand: string;
  categories: Array<string>;
  description: string;
  images: Array<KrogerImage>;
  items: Array<{
    price: { regular: number };
  }>;
}

interface KrogerImage {
  perspective: string;
  sizes: Array<KrogerImageSize>;
}

interface KrogerImageSize {
  size: string;
  url: string;
}
