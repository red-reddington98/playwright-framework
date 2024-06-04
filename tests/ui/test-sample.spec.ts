import {test } from '@playwright/test';
import { expect } from 'chai'; 
import LoginPage from '../../pages/ui/pages/LoginPage'
import AccountService from '../../pages/api/services/AccountService'
import dotenv from 'dotenv'; 
dotenv.config();
const authFile = process.env.FILE_PATH || "Please provide path to the file"


test.describe('Create a new user', () => {
    test.use({storageState: authFile})

    test('POSITIVE-1: should create a new user and return status 201', async ({page}) => {
       await page.goto('https://demoqa.com/profile');
    });
    
})