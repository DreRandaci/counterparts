// Parameters imported from .env file (environment variables)
const apiBaseUrl = process.env.API_BASE_URL;
const oauth2BaseUrl = process.env.OAUTH2_BASE_URL;
const clientId = process.env.CLIENT_ID;
const redirectUrl = process.env.REDIRECT_URL;

export default { apiBaseUrl, oauth2BaseUrl, clientId, redirectUrl };