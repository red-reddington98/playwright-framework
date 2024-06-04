import { faker } from '@faker-js/faker';


export const createRandomizedUser = { 
        password: faker.internet.password({ length: 20, pattern: /[@!-.-A-Z0-9]/, prefix: 'Test' }),
        userName: faker.internet.userName()
    }