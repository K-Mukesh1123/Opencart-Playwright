import {test,expect} from "../fixtures/authFixtures";
import { MyAccountInformationPage } from "../pages/MyAccountInformationPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { DataProvider } from "../utils/dataProvider";
import { LogoutPage } from "../pages/LogoutPage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";


/*
Test Steps:
1. Click on 'My Account' dropmenu
2. Select 'My Account' option 
3. Click on 'Edit your account information' link on the displayed 'My Account' page
4. Update all the details in the fields - First  Name, Last Name, E-Mail and Telephone 
5. Click on 'Continue' buttton (Validate ER-1 and ER-2)
6. Logout and login with new updated Email Address (Validate ER-3)
7. Logout and login with old Email Address (Validate ER-4)
*/

const jsonPath="testdata/updateMyAccountInfo.json";
const testdata=DataProvider.getTestDataFromJson(jsonPath);
const testConfig=new TestConfig();

test(`Validate updating the Account Details in the 'My Account Information' page`, async({homePage})=>{
    
    let myAccountPage:MyAccountPage;
    let myAccountInfoPage:MyAccountInformationPage;
    let logOutPage:LogoutPage;
    let loginPage:LoginPage;

    await test.step("1. Click on 'My Account' dropmenu", async()=>{
        await homePage.clickMyAccount();
    })

    await test.step("2. Select 'My Account' option ", async ()=>{
        myAccountPage=await homePage.selectMyAccount();
        expect(await myAccountPage.getPageTitle()).toContain("My Account")
    })

    await test.step("3. Click on 'Edit your account information' link on the displayed 'My Account' page", async()=>{
        myAccountInfoPage=await myAccountPage.clickOnEditYourAccountInfo();
    })

    await test.step("4. Update all the details in the fields - First  Name, Last Name, E-Mail and Telephone", async()=>{
        await myAccountInfoPage.updateMyAccountInfo(testdata);
        
    })

    await test.step("5. Click on 'Continue' buttton (Validate ER-1 and ER-2)", async()=>{
        myAccountPage=await myAccountInfoPage.clickOnContinue();
        await expect(myAccountPage.getSuccessMessageLocator()).toContainText("Success: Your account has been successfully updated.");
    })

    await test.step("6. Logout and login with new updated Email Address (Validate ER-3)",async ()=>{
        logOutPage=await myAccountPage.clickLogout();
        await expect(logOutPage.getPageTitle()).toContainText("Account Logout");
        loginPage=await logOutPage.clickLogin();
        await loginPage.login(testdata.email, testConfig.password);
    })

    
})



