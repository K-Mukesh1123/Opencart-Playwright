import {Page,Locator,expect} from "@playwright/test";

import {LogoutPage} from "./LogoutPage";

export class MyAccountPage{

    private readonly page:Page;

    //Locators:
    private readonly msgHeading:Locator;
    private readonly btnLogout:Locator;

    //constructor
    constructor(page:Page){

        this.page=page;

        //initilaise locators
        this.msgHeading=page.locator('h2:has-text("My Account")');
        this.btnLogout=page.locator("text='Logout").nth(1);
            
    }


    /**
     * Verifies if My Account Page is displayed
     * @returns Promise<boolena> -Returns true if heading is visible
     */

    async isMyAccountPageExists():Promise<boolean>{
        try{
            const isVisible=await this.msgHeading.isVisible();
            return isVisible;
        }catch(error){
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
        }
    }

    /**
     * clicks on logout link
     * @returns Promise<LogoutPage>- Returns instance of LogoutPage
     */

    async clickLogout():Promise<LogoutPage>{
       try{
        await this.btnLogout.click();
        return new LogoutPage(this.page);
       }catch(error){
        console.log(`Unable to click logout link: ${error}`);
        throw error;
       }

    }



    /**
     * Alternative method to return page exists using title
     * @returns Promise<boolean> -returns true if page title matches
     */

    async getPageTitle():Promise<string>{
        return (this.page.title());
    }
















}