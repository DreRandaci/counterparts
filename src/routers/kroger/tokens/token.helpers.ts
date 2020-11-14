const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const scopes = process.env.KROGER_SCOPES;
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

interface KrogerToken {
  expires_in: number;
  access_token: string;
  token_type: string;
}

export const getToken = async (): Promise<AxiosResponse<KrogerToken>> => {
  const creds = Buffer.from(`${clientId}:${clientSecret}`, `ascii`).toString(
    'base64',
  );

  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${creds}`,
    },
  };

  const body = {
    grant_type: 'client_credentials',
    scope: scopes,
  };

  const tokenUrl = `${process.env.OAUTH2_BASE_URL}/token`;

  try {
    const response = await axios.post(tokenUrl, qs.stringify(body), headers);
    return response.data;
  } catch (error) {
    // TODO: handle errs
    console.log(error);
  }
};
