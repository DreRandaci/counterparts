// Parameters imported from .env environment variables
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URL;

// Get token by authorization code (getByAuth)
async function getByAuth(code): Promise<string> {
  const body = `grant_type=authorization_code&code=${encodeURIComponent(
    code
  )}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
  return await get(body);
}

async function get(body): Promise<string> {
  // ClientId and ClientSecret (stored in .env file)
  const encoded = Buffer.from(`${clientId}:${clientSecret}`, `ascii`);
  // ClientId and clientSecret must be encoded
  const authorization = "Basic " + encoded.toString("base64");
  // Base URL (https://api.kroger.com/v1/connect/oauth2)
  // Version/Endpoint (/v1/token)
  const tokenUrl = `${process.env.OAUTH2_BASE_URL}/token`;

  // token request
  let tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "User-Agent": "",
      Authorization: authorization,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body
  });
  // Handle response
  if (tokenResponse.status >= 400) {
    console.log(`tokenResponse error: ${tokenResponse.status}`);
    throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
  }
  // Return json object
  return await tokenResponse.json();
}