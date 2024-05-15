import { request } from 'playwright';
import Logger from '../../common/logger.js'

export default class ApiRequests {
    constructor() {
        this.logger = new Logger();
    }

    async sendLoginRequest(url, userName, password) {
        try{
            const response = await (await request.newContext()).post(url, { data: {userName, password } })
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

    async sendDeleteRequest(url, bearerToken) {
        try{
            const response = await (await request.newContext()).delete(url, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            }) 
            this.logger.info(`DELETE Request: ${url}`);
            this.logger.info(`Response status: ${response.status()}`);
            this.logger.info(`Response body: ${await response.text()}`);

            return response;
        } 
        catch (error) {
            this.logger.error(`Error sending DELETE request to ${url}: ${error.message}`);
            throw error;
        }
    }
}
