import {test } from '@playwright/test';
import { expect } from 'chai'; 
import AccountService from '../../pages/api/services/AccountService'
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv'; 
import Logger from '../../common/logger';
dotenv.config();





test.describe('Create a new user', () => {

    const accountService = new AccountService()
    const logger = new Logger()
  
    test('POSITIVE-1: should create a new user and return status 201', async () => {
        const requestBody = {
            password: process.env.PASSWORD,
            userName: faker.internet.userName()
        }
        const response = await accountService.createUser(requestBody)

        //userID is a field in the response body which value is assigned to userId variable
        const { userID: userId, username} = await response.json()
        logger.info(userId)
        //console.log(userId)
        logger.info(username)
        //console.log(username)
        expect(response.status()).to.be.eql(201)
        expect(userId).to.not.be.empty;
        expect(username).to.not.be.empty;

    });


    test('NEGATIVE-1: Empty username and password fields, should return a 400 Bad Request', async () => {

        const requestBody = {
            password: "",
            userName: ""
        }
        const response = await accountService.createUser(requestBody)
        expect(response.status()).to.be.eql(400)
        expect((await response.json()).message).to.include('UserName and Password required.')
    });


    test('NEGATIVE-2: null username and null fields, should return a 400 Bad Request', async () => {
    
        const requestBody = {
            "password": null,
            "userName": null
        }
        const response = await accountService.createUser(requestBody)
        expect(response.status()).to.be.eql(400)
        expect((await response.json()).message).to.include('UserName and Password required.')
    });

    test('NEGATIVE-3: username not a string, should return a 400 Bad Request', async () => {
        
        const requestBody = {
            password: process.env.PASSWORD,
            userName: 1
        }
        const response = await accountService.createUser(requestBody)
        expect(response.status()).to.be.eql(400)
        expect((await response.json()).message).to.include('Invalid username')
    });         
  
  })