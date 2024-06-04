import ApiRequests from '../utils/common.js'
import { ACCOUNTS_BASE_URL, ACCOUNT_ENDPOINTS } from '../utils/constants.js';
import { APIResponse } from "playwright-core"


export default class AccountService extends ApiRequests {
  
  constructor() {
    super()
  }

  async generateAccessToken(userName: string, password: string): Promise <APIResponse> {
    const url: string = `${ACCOUNTS_BASE_URL}/${ACCOUNT_ENDPOINTS.GENERATE_TOKENS}`;

    try {
      this.logger.info(`Logging in with user: ${userName} and password ${password}`);
      const response = await this.sendLoginRequest(url, userName, password)
      this.logger.info(`Sending user login request: ${await response.text()}`)
      return response;
      
    } 
    catch (error: any) {
      console.error(error);
      this.logger.error(`Error occured while logging in: ${error.message}`)
      throw new Error(`Error occured while logging in: ${error.message}`);
    }
  }

  async createUser(userData: object): Promise <APIResponse> {
    const url: string = `${ACCOUNTS_BASE_URL}/${ACCOUNT_ENDPOINTS.USER}`;
    
    try {
      this.logger.info(`Registering a new user at ${url}`);
      const response = await this.sendPostRequest(url, userData);
      this.logger.info(`Sending user registration request: ${(await response.text())}`)
      return response;
      
    } 
    catch (error: any) {
      console.error(error);
      this.logger.error(`Error registering a user: ${error.message}`)
      throw new Error(`Error registering a user: ${error.message}`);
    }
  }

  async deleteUser(uuid: any, accessToken: string):  Promise <APIResponse> {
    const url: string = `${ACCOUNTS_BASE_URL}/${ACCOUNT_ENDPOINTS.USER}/${uuid}`;
    
    try {
      this.logger.info(`Deleting user with ${uuid}`);
      const response = await this.sendDeleteRequest(url, accessToken);
      this.logger.info(`Sending DELETE request: ${(await response.text())}`)
      return response;
      
    } 
    catch (error: any) {
      console.error(error);
      this.logger.error(`Error deleting a user: ${error.message}`)
      throw new Error(`Error deleting a user: ${error.message}`);
    }
  }

}
