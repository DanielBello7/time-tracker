const LOCAL_API_ENDPOINT = process.env.LOCAL_API_ENDPOINT as string;
const LIVE_API_ENDPOINT = process.env.LIVE_API_ENDPOING as string;
const LOCAL_BASE_URL = process.env.LOCAL_BASE_URL as string;
const LIVE_BASE_URL = process.env.LIVE_BASE_URL as string;

const LIVE = {
    API_ENDPOINT: LIVE_API_ENDPOINT,
    BASE_URL: LIVE_BASE_URL
}

const LOCAL = {
    API_ENDPOINT: LOCAL_API_ENDPOINT,
    BASE_URL: LOCAL_BASE_URL
}

export { LIVE, LOCAL }