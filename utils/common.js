import { request } from 'playwright';
import Logger from '../utils/logger.js'

export default class ApiRequests {
    constructor() {
        this.logger = new Logger();
    }

    async sendPostRequest(url, requestBody) {
        try{
            const response = await (await request.newContext()).post(url, {data: requestBody})
            this.logger.info(`POST Request: ${url}`);
            this.logger.info(`Response status: ${response.status()}`);
            this.logger.info(`Response body: ${await response.text()}`);

            return response;
        } 
        catch (error) {
            this.logger.error(`Error sending POST request to ${url}: ${error.message}`);
            throw error;
        }
    }

    

    async sendGetRequest(url, headers = {}) {
        const options = {
            headers: { ...headers },
        };

        try {
            const response = await request.newContext().get(url, options);

            this.logger.info(`GET Request: ${url}`);
            this.logger.info(`Response: ${response.status()}`);

            return response;
        } 
        catch (error) {
            this.logger.error(`Error sending GET request to ${url}: ${error.message}`);
            throw error;
        }
    }
}
