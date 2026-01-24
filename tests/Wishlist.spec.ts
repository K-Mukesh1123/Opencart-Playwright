/**
 * 
 * 
 * Steps:
 * 1. Enter any existing Product name into the Search text box field - <Refer Test Data>
2. Click on the button having search icon
3. Click on the Product displayed in the Search results
4. Click on 'Add to Wish List' option on a product that is displayed in the 'Related Products' section of displayed 'Product Display' page (Validate ER-1)
5. Click on the 'wish list!' link in the displayed success message (Validate ER-2)
 */

import {test,expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage"
import {TestConfig} from "../test.config"
import { DataProvider } from "../utils/dataProvider";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";

const jsonpath= "testdata/searchProduct.json";
const jsonTestData=DataProvider.getTestDataFromJson(jsonpath);

let homePage:HomePage;
let searchResultsPage:SearchResultsPage;
let productPage:ProductPage;
let loginPage:LoginPage
let myAccountPage:MyAccountPage;

test.beforeEach("Login function", async ({page})=>{
    const config=new TestConfig();
    await page.goto(config.appUrl);

    homePage=new HomePage(page);

    await homePage.clickMyAccount();
    await homePage.clickLogin();
    
    loginPage=new LoginPage(page);
        //enter valid credentials
    
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    myAccountPage=new MyAccountPage(page);
      
    homePage=await myAccountPage.clickOnHomeButton();
})

for (const data of jsonTestData){



test(`Validation of a product to wishlist- ${data.testName}`, async ()=>{
 
    // 1. Enter any existing Product name into the Search text box field - <Refer Test Data>
    
    await homePage.enterProductName(data.product);
    // 2. Click on the button having search icon
    searchResultsPage=await homePage.clickSearch();

    // 3. Click on the Product displayed in the Search results
    
    productPage =await searchResultsPage.selectProduct(data.product);

    // 4. Click on 'Add to Wish List' option on a product that is displayed in the 'Related Products' section of displayed 'Product Display' page (Validate ER-1)

    await productPage.clickWishListButton();

    // 5. Click on the 'wish list!' link in the displayed success message (Validate ER-2)
    await productPage.clickWishListLinkFromSuccessMsg();








})

}