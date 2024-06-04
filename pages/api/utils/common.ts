import { request } from 'playwright';
import Logger from '../../../common/logger'
import { APIResponse } from "playwright-core"



export default class ApiRequests {
    logger: Logger;
    constructor() {
        this.logger = new Logger();
    }

    async sendLoginRequest(url: string, userName: string, password: string): Promise<APIResponse> {
        try{
            const response = await (await request.newContext()).post(url, { data: {userName, password } })
            this.logger.info(`POST Request: ${url}`);
            this.logger.info(`Response status: ${response.status()}`);
            this.logger.info(`Response body: ${await response.text()}`);
            return response;
        } 
        catch (error: any) {
            this.logger.error(`Error sending POST request to ${url}: ${error.message}`);
            throw error;
        }
    }

    async sendPostRequest(url: string, requestBody: object): Promise<APIResponse> {
        try{
            const response = await (await request.newContext()).post(url, { data: requestBody })
            this.logger.info(`POST Request: ${url}`);
            this.logger.info(`Response status: ${response.status()}`);
            this.logger.info(`Response body: ${await response.text()}`);

            return response;
        } 
        catch (error: any) {
            this.logger.error(`Error sending POST request to ${url}: ${error.message}`);
            throw error;
        }
    }

    

    async sendGetRequest(url: string, bearerToken: string, queryParameters?: string ) : Promise<APIResponse>{

        try {
            const response = await (await request.newContext()).get(`${url}?${queryParameters}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            })
            this.logger.info(`GET Request: ${url}`);
            this.logger.info(`Response: ${response.status()}`);

            return response;
        } 
        catch (error: any) {
            this.logger.error(`Error sending GET request to ${url}: ${error.message}`);
            throw error;
        }
    }

    async sendDeleteRequest(url: string, bearerToken: string): Promise<APIResponse>{
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
        catch (error: any) {
            this.logger.error(`Error sending DELETE request to ${url}: ${error.message}`);
            throw error;
        }
    }
}
