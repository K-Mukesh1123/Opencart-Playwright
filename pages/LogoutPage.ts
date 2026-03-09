import {Page,Locator,expect} from "@playwright/test";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";

export class LogoutPage{

    private readonly page:Page;
    private readonly btnContinue:Locator;
    private readonly pageTitle:Locator;
    private readonly myAccountToggle:Locator;
    private readonly LoginBtn:Locator;

    constructor(page:Page){
        this.page=page;
        this.btnContinue=page.locator('.btn.btn-primary');
        this.pageTitle=page.getByRole('heading', { name: 'Account Logout' })
        this.myAccountToggle=page.getByRole('link',{name:'My Account'}).first();
        this.LoginBtn=page.getByRole('link',{name:'Login'}).first();
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

    getPageTitle(){
        return this.pageTitle;
    }

    async clickLogin(){
        await this.myAccountToggle.click();
        await this.LoginBtn.click();
        return new LoginPage(this.page);
    }

    
}