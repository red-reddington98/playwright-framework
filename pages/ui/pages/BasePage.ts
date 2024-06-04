import { Locator, Page } from '@playwright/test';

export default class BasePage {

    protected readonly page: Page
    
    constructor(page:Page) {
        this.page = page;
    }

    protected getElementByRole(locator: any ): Locator{
        return this.page.getByRole(locator)
    }

    protected  getElementByLabel(locator: any): Locator {
        return this.page.getByLabel(locator)
    }

    protected getElementByText(locator:any) : Locator {
        return this.page.getByRole(locator)
    }

    protected getElementByPlaceholder(locator:any): Locator{
        return this.page.getByPlaceholder(locator)
    }

    protected getElementByAltText(locator:any): Locator{
        return this.page.getByAltText(locator)
    }

    protected getElementByTitle(locator:any): Locator{
        return this.page.getByTestId(locator)
    }

    protected getElementByTestId(locator:any): Locator{
        return this.page.getByTestId(locator)
    }

    protected getElementByXpath(locator:any): Locator{
        return this.page.locator(locator)
    }

    protected async navigateToPage(url: string): Promise <void> {
        await this.page.goto(url,{waitUntil: 'domcontentloaded'})
    }

    protected async selectInputAndType(locator: string, text: string){
        const inputElement = this.getElementByPlaceholder(locator)
        await inputElement.click()
        await inputElement.fill(text)
    }

}