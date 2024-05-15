import ApiRequests from '../utils/common.js'


const endpoints = {
    USERS: '/api/users',
    USER_BY_ID: '/api/user/:userId',
    REGISTER_USER: '/api/user/register',
  };

export default class AccountService extends ApiRequests {

  constructor() {
    super()
    this.baseUrl = 'https://demoqa.com';
  }

  async generateAccessToken(userName, password) {
    const url = `${this.baseUrl}/Account/v1/GenerateToken`;
    
    try {
      this.logger.info(`Logging in with user: ${userName}`);
      const response = await this.sendLoginRequest(url, userName, password)
      this.logger.info(`Sending user login request: ${(await response.text())}`)
      return response;
      
    } 
    catch (error) {
      console.error(error);
      this.logger.error(`Error occured while logging in: ${error.message}`)
      throw new Error(`Error occured while logging in: ${error.message}`);
    }
  }

  async createUser(userData) {
    const url = `${this.baseUrl}/Account/v1/User`;
    
    try {
      this.logger.info(`Registering a new user at ${url}`);
      const response = await this.sendPostRequest(url, userData);
      this.logger.info(`Sending user registration request: ${(await response.text())}`)
      return response;
      
    } 
    catch (error) {
      console.error(error);
      this.logger.error(`Error registering a user: ${error.message}`)
      throw new Error(`Error registering a user: ${error.message}`);
    }
  }

  async deleteUser(uuid, accessToken) {
    const url = `${this.baseUrl}/Account/v1/User/${uuid}`;
    
    try {
      this.logger.info(`Deleting user with ${uuid}`);
      const response = await this.sendDeleteRequest(url, accessToken);
      this.logger.info(`Sending DELETE request: ${(await response.text())}`)
      return response;
      
    } 
    catch (error) {
      console.error(error);
      this.logger.error(`Error deleting a user: ${error.message}`)
      throw new Error(`Error deleting a user: ${error.message}`);
    }
  }

}
