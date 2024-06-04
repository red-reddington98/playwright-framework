import BasePage from "./BasePage";
import { Locator, Page } from '@playwright/test';

export default class LoginPage extends BasePage {

    //readonly locator: Locator
    private userNameInput: string = 'UserName'
    private PasswordInputField: string = 'Password'

    constructor(page:Page, locator?: Locator){
       super(page)
       //this.locator = locator
    }


    async navigateToLoginPage(): Promise < void >{
        await this.navigateToPage('/login')
    }

    async enterUsername(username: string): Promise<void>{
       await this.selectInputAndType(this.userNameInput, username)
    }

    async enterPassword(password: string): Promise<void>{
        await this.selectInputAndType(this.PasswordInputField, password)
    }

}