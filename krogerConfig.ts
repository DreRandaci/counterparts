const apiBaseUrl = process.env.API_BASE_URL;
const oauth2BaseUrl = process.env.OAUTH2_BASE_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URL;
const scopes = process.env.KROGER_SCOPES;

export interface KrogerConfig {
  apiBaseUrl: string;
  oauth2BaseUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  scopes: string;
}

export const getKrogerConfig = (): KrogerConfig => {
  return {
    apiBaseUrl,
    oauth2BaseUrl,
    clientId,
    clientSecret,
    redirectUrl,
    scopes,
  };
};
