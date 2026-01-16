/**
 * Test Cas: user Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page
 */

import {test,expect} from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";

let config:TestConfig;
let homePage:HomePage;
let loginPage:LoginPage;
let myAccountPage:MyAccountPage;
let logoutPage:LogoutPage;

//setup before each test
test.beforeEach(async ({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl);

    homePage=new HomePage(page);
    loginPage=new LoginPage(page);
    myAccountPage=new MyAccountPage(page);
    //logoutPage=new LogoutPage(page);

});

test.afterEach(async ({page})=>{
    await page.close();
});

test('User logout test @master @regression', async ()=>{

    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //perform with valid creds
    await loginPage.login(config.email,config.password);

    //verify succesful login
    expect (await myAccountPage.isMyAccountPageExists()).toBeTruthy();

    //click logout
    logoutPage=await myAccountPage.clickLogout();

    //Verify "Continue" button is visible before clicking
    expect(await logoutPage.isContinueButtonVisible());

    //Click Continue and verify redirection to HomePage
    homePage=await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);
})