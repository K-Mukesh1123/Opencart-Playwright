import {Page,Locator,expect} from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage{

    private readonly page:Page;
    private readonly btnContinue:Locator;

    constructor(page:Page){
        this.page=page;
        this.btnContinue=page.locator('.btn.btn-primary');
    }

    /**
     * Clicks on Continue button after logout
     * @returns Promise<HomePage> -returns instance of HomePage
     */

    async clickContinue(){
        await this.btnContinue.click();
        return new HomePage(this.page);
    }

    /**
     * Verifies if the Continue button is visible
     * @returns Promise<boolean> - returns true if button is visible
     */

    async isContinueButtonVisible(){
        return await this.btnContinue.isVisible();
    }
}