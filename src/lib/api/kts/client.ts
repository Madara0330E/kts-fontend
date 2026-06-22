import createClient from 'openapi-fetch';
import type { paths } from './schema';

export const API_CHAIN = "01591025-89cc-45d1-8511-c05a8ccf2e00"
const API_TOKEN = "40061165845545759700789576518114400611658455457597007895765181144006116584554575970078957651811440061165845545759700789576518111"

export const client = createClient<paths>({
    baseUrl: 'https://kts-development.mzh.su',
    fetch: async (request) => {
        return fetch(request.url, {
            ...request,
            headers: {
                ...request.headers,
                'Authorization-Chain': API_CHAIN,
                'Authorization-Token': API_TOKEN
            }
        });
    }
});