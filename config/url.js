const DEV_URL = process.env.DEV_URL;
const PRO_URL = process.env.PRO_URL;

export const baseURL =
    process.env.NODE_ENV === 'development' ? DEV_URL : PRO_URL;