import axios from 'axios';
import qs from 'qs';
import {
  KrogerProductsList,
  KrogerServiceToken,
} from 'src/routers/kroger/types/Kroger';
import { getKrogerConfig } from '../../krogerConfig';

export const getKrogerAccessToken = async (): Promise<KrogerServiceToken> => {
  const config = getKrogerConfig();

  const creds = Buffer.from(
    `${config.clientId}:${config.clientSecret}`,
    `ascii`,
  ).toString('base64');

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${creds}`,
    },
  };

  const body = {
    grant_type: 'client_credentials',
    scope: config.scopes,
  };

  const tokenUrl = `${config.oauth2BaseUrl}/token`;

  try {
    const response = await axios.post(tokenUrl, qs.stringify(body), headers);
    const data = response.data as KrogerServiceToken;
    return data;
  } catch (error) {
    // TODO: handle errs
    console.error(error);
  }
};

export const getKrogerProducts = async (
  accessToken: string,
  locationId?: string,
): Promise<KrogerProductsList> => {
  const config = getKrogerConfig();

  const filterTerms = `candy`;
  const _locationId = locationId ?? '02600880';
  const productsListUrl = `${config.apiBaseUrl}/products?filter.term=${filterTerms}&filter.locationId=${_locationId}&filter.limit=50`;

  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.get(productsListUrl, headers);
    const data = response.data as KrogerProductsList;
    return data;
  } catch (error) {
    // TODO: handle errs
    console.error(error);
  }
};
