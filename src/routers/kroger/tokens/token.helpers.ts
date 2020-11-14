// TODO: create module alias for this
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { getKrogerConfig } from '../../../../krogerConfig';
import { KrogerServiceToken } from '../types/KrogerServiceToken';

export const getToken = async (): Promise<
  AxiosResponse<KrogerServiceToken>
> => {
  const krogerConfig = getKrogerConfig();
  const creds = Buffer.from(
    `${krogerConfig.clientId}:${krogerConfig.clientSecret}`,
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
    scope: krogerConfig.scopes,
  };

  const tokenUrl = `${krogerConfig.oauth2BaseUrl}/token`;

  try {
    const response = await axios.post(tokenUrl, qs.stringify(body), headers);
    return response.data;
  } catch (error) {
    // TODO: handle errs
    console.log(error);
  }
};
