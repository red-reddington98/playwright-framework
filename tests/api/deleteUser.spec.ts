import {test } from '@playwright/test';
import { expect } from 'chai'; 
import AccountService from '../../pages/api/services/AccountService'
import {createRandomizedUser} from '../../test-data/createUserRequestBody.js'
import dotenv from 'dotenv'; 
dotenv.config();



let token: string;
let username: string;
let userId: string;

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
  
    test('POSITIVE-1: should delete the user and return 204', async () => {
        const deleteUserResponse =  (await accountService.deleteUser(userId, token))
        expect( deleteUserResponse.status()).to.be.eql(204)
    });
    
  
    test('NEGATIVE-1: non-existing userId should return 404', async () => {
        const deleteUserResponse =  await accountService.deleteUser('non-existing-userid', token)
        expect(await(await deleteUserResponse.json()).message).to.contain('User Id not correct!')
        expect(deleteUserResponse.status()).to.be.eql(404)
    });
  
    test('NEGATIVE-2: missing userId', async () => {
        const deleteUserResponse = (await accountService.deleteUser('', token))
        const errorMessage = (await deleteUserResponse.text()).match(/<pre>(.*?)<\/pre>/)?.[1]
        expect(deleteUserResponse.status()).to.be.eql(400)
        expect(errorMessage).to.eql('Cannot DELETE /Account/v1/User/')
    });

    test('NEGATIVE-3: null userId', async () => {
        const deleteUserResponse =  await accountService.deleteUser(null, token)
        expect(await (await deleteUserResponse.json()).message).to.contain('User Id not correct!')
        expect(deleteUserResponse.status()).to.be.eql(400)
    });

    test('NEGATIVE-4: valid userId + invalid accessToken', async () => {
        const deleteUserResponse = (await accountService.deleteUser(userId, "invalid"))
        expect(deleteUserResponse.status()).to.be.eql(401)
        expect(await (await deleteUserResponse.json()).message).to.be.eql('User not authorized!')
    });
  
  })