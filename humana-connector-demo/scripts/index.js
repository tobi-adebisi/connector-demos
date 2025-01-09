import 'dotenv/config'
// import fetch from 'node-fetch';

//Get code from https://fhir.humana.com/sandbox/auth/authorize?client_id=15290b9c-4e7e-413f-afd4-43c185df8708&redirect_uri=https://developers.humana.com/&response_type=code
//Username: HUser00001
//Password: PW00001!

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const code = process.env.AUTHORIZATION_CODE;

const authTokenUrl = "https://fhir.humana.com/sandbox/auth/token";

async function main() {
  try {
    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", `Basic ${basicAuth}`);

    const body = new URLSearchParams({
        code,
        grant_type: "authorization_code",
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
