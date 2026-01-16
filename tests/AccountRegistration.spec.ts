/**
 * Test Case: Account registration
 * 
 * tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with randaom data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
import { randomUUID } from 'node:crypto';

let config:TestConfig;
let homePage:HomePage;
let registrationPage:RegistrationPage;

//Hooks :to launch url and create page objects
test.beforeEach(async ({page})=>{

    //Navigate to url
   config= new TestConfig();
   await page.goto(config.appUrl);
   //initialse page objects
   homePage=new HomePage(page);
   registrationPage=new RegistrationPage(page);

})

test.afterEach(async({page})=>{
    await page.close();
})


test('User registration test @master @sanity @regression',async ({page})=>{

    

   //Go to 'My Account' and Click 'register'
   
   await homePage.clickMyAccount();
   await homePage.clickRegister();

   //Fill registration details
   
   await registrationPage.setFirstName(RandomDataUtil.getRandomFirstname());
   await registrationPage.setlastName(RandomDataUtil.getRandomLastname());
   await registrationPage.setEmail(RandomDataUtil.getRandomEmail());
   await registrationPage.setTelephone(RandomDataUtil.getRandomTelephone());
   const password=RandomDataUtil.getRandomPassword();
   await registrationPage.setPassword(password);
   await registrationPage.setConfirmPassword(password);
   await registrationPage.setPrivacyPolicy();
   await registrationPage.clickContinue();

   //validate the confirmation message

   const confrirmationMsg=await registrationPage.getConfirmationMsg();
   expect(confrirmationMsg).toContain("Your Account Has Been Created!");


   await page.waitForTimeout(3000);



})