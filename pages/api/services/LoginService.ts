import ApiRequests from '../utils/common.js';


export default class LoginService extends ApiRequests {
  baseUrl: string;
  constructor() {
    super();
    this.baseUrl = 'https://bookcart.azurewebsites.net/api';
  }

  async getToken(credentials: object) {
    const url = `${this.baseUrl}/Login`;

    try {
      const response = await this.sendPostRequest(url, credentials);
      return response;
      
    } 
    catch (error: any) {
      console.error(error);
      this.logger.error(`Error logging in: ${error.message}`)
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
}