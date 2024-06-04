import { expect, test as setup } from '@playwright/test';
import dotenv from 'dotenv';
import LoginPage from '../../pages/ui/pages/LoginPage';
dotenv.config();


const authFile = process.env.FILE_PATH || "File path can't be empty";
let username: string = process.env.USER_NAME_DEMO || "username is empty or null"
let password: string = process.env.PASSWORD_DEMO || "password is empty or null"

setup('authenticate', async ({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateToLoginPage()
    await loginPage.enterUsername(username)
    await loginPage.enterPassword(password)
    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForTimeout(5000)
    await page.waitForURL('https://demoqa.com/');
    await expect(page.getByRole('link')).toBeVisible()
    await page.context().storageState({ path: authFile }); 
});
