/**
 * Test case: Login with Valid Credentials
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1)) Navigate to the application URL
 * 2)Navigate to Login Page via Home Page
 * 3) Enter valid credentials and log in
 * 4) verify succesful login by checking 'My Account' page presence
 */

import {test,expect} from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {MyAccountPage} from "../pages/MyAccountPage"


let config:TestConfig;
let homePage:HomePage;
let loginPage:LoginPage;
let myAccountPage:MyAccountPage;

test.beforeEach(async ({page})=>{

    
        //Navigate to url
       config= new TestConfig();
       await page.goto(config.appUrl);
       //initialse page objects
       homePage=new HomePage(page);
       myAccountPage=new MyAccountPage(page);
       loginPage=new LoginPage(page);

});

test.afterEach(async ({page})=>{
    await page.close();
})

test('User Login test @master @sanity @regression',async ()=>{

    //Navigate to Login page
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //enter valid credentials

    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    // verify succesful login by checking 'My Account' page presence

    const isLoggedIN=await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIN).toBeTruthy();


})

