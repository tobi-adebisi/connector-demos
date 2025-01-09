import 'dotenv/config'

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;

const authTokenUrl = "https://fhir.humana.com/sandbox/auth/token";

async function main() {
  try {
    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", `Basic ${basicAuth}`);

    const body = new URLSearchParams({
        refresh_token,
        grant_type: "refresh_token",
        redirect_uri: "https://developers.humana.com/",
      });
    const response = await fetch(authTokenUrl, {
      method: "POST",
      body,
      headers,
    });
    const json = await response.json();
    console.log(json);
  } catch (e) {
    console.log(e);
  }
}

main();
