import {test } from '@playwright/test';
import { expect } from 'chai'; 
import AccountService from '../../api/services/AccountService.js'
import {createRandomizedUser} from '../../test-data/createUserRequestBody.js'
import dotenv from 'dotenv'; 
dotenv.config();



let token;
let username;
let userId;

test.beforeEach( async () => {

    const accountService = new AccountService()
    const createUserResponse = await accountService.createUser(createRandomizedUser)
    userId = await (await createUserResponse.json()).userID
    username = await (await createUserResponse.json()).username
    expect(createUserResponse.status()).to.be.eql(201)
    expect(userId).to.not.be.empty;
    expect(username).to.not.be.empty;
    token = (await (await accountService.generateAccessToken(username, createRandomizedUser.password)).json()).token;
});


test.describe('Delete a user', () => {

   const accountService = new AccountService()
  
    test('POSITIVE-1: should delete the user and return 200', async () => {
        const deleteUserResponse =  await (await accountService.deleteUser(userId, token)).text()
    });
  
  
  })