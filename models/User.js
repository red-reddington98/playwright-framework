import ApiRequests from '../utils/common.js'


const endpoints = {
    USERS: '/api/users',
    USER_BY_ID: '/api/user/:userId',
    REGISTER_USER: '/api/user/register',
    // Add more user-related endpoints as needed
  };

export default class UserService extends ApiRequests {

  constructor() {
    super()
    this.baseUrl = 'https://demoqa.com';
  }

  // async getUserById(userId) {
  //   const url = `${this.baseUrl}/User/${userId}`;
  //   logger.info(`Fetching user with ID ${userId} from ${url}`);
  //   return this.apiRequests.get(url);
  // }

  // async validateUserName(userName) {
  //   const url = `${this.baseUrl}/User/validateUserName/${userName}`;
  //   logger.info(`Validating username ${userName} at ${url}`);
  //   return this.apiRequests.get(url);
  // }

  async registerUser(userData) {
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

}
