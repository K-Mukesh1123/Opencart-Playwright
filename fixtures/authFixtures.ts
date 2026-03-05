import{test as base} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";


type AuthFixtures={
    homePage:HomePage;
    myAccountPage:MyAccountPage;
    loginPage:LoginPage;
};

export const test=base.extend<AuthFixtures>({
    homePage:async({page},use)=>{
        const config=new TestConfig();
        await page.goto(config.appUrl);
        const homePage=new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        
        const loginPage = new LoginPage(page); 
        await loginPage.setEmail(config.email); 
        await loginPage.setPassword(config.password); 
        await loginPage.clickLogin();

        const myAccountPage = new MyAccountPage(page); 
        const updatedHomePage = await myAccountPage.clickOnHomeButton(); 

        await page.context().storageState({ path: 'auth/user.json' });
        await use(updatedHomePage);
    },

    myAccountPage:async ({page},use)=>{
        const myAccountPage = new MyAccountPage(page); 
        await use(myAccountPage);
     }
    

});

export { expect } from "@playwright/test";

