import {test,expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import {MyAccountPage} from "../pages/MyAccountPage";
import { DataProvider } from "../utils/dataProvider";
import { TestConfig } from "../test.config";

const jsonpath:string="testdata/logindata.json";

const jsonTestData:any=DataProvider.getTestDataFromJson(jsonpath);

for(const data of jsonTestData){

    test(`Login Test with JSON Data: ${data.testName}`,async ({page})=>{

        const config =new TestConfig();
        await page.goto(config.appUrl);

        const homePage=new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage=new LoginPage(page);
        await loginPage.login(data.email, data.password);

       

        if(data.expected.toLowerCase()==='success'){
            const MyAccountpage=new MyAccountPage(page);
            const isLoggedIn=await MyAccountpage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();

        }else{
            const errorMessage=await loginPage.getLoginErrorMessage();
            expect(errorMessage).toBe("Warning: No match for E-Mail Address and/or Password.")
        }

    })
}