/**
 * Test Scenario: 
 * 
 * tags: @master @sanity @regression
 * 
 * Steps:
 * Open the URL
 * 1. Enter any existing Product name into the Search text box field - <Refer Test Data>
 * 2. Click on the button having search icon
*  3. Click on the Product displayed in the Search results
*  4. Hover the mouse cursor on 'Compare this Product' option from the displayed Product Display Page (Validate ER-1)
*  5. Select 'Compare this Product' option  (Validate ER-2)
*  6. Click on 'product comparision' link from the displayed success message (Validate ER-3)
 * 
 * 
 */




import { test, expect } from "@playwright/test"
import { LoginPage } from '../pages/LoginPage'
import { MyAccountPage } from '../pages/MyAccountPage'
import { SearchResultsPage } from "../pages/SearchResultsPage"
import { LogoutPage } from '../pages/LogoutPage'
import { HomePage } from "../pages/HomePage"
import { ProductComparison } from "../pages/ProductComparisonPage"
import { ProductPage } from "../pages/ProductPage"
import { DataProvider } from "../utils/dataProvider";
import { TestConfig } from "../test.config"

const jsonpath: string = "testdata/searchProduct.json";

const jsonTestData = DataProvider.getTestDataFromJson(jsonpath);
console.log(jsonTestData);


let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;
let productComparison: ProductComparison;

for (const data of jsonTestData) {

    test("Compare 2 Products", async ({ page }) => {

        const config = new TestConfig();
        await page.goto(config.appUrl);
        homePage = new HomePage(page);
        console.log(jsonTestData);

        // 1. Enter any existing Product name into the Search text box field - <Refer Test Data>
        await homePage.enterProductName(data.product)
        // 2. Click on the button having search icon
        searchResultsPage = await homePage.clickSearch();
        expect(`Search - ${data.product}`).toBeTruthy();
        // 3. Click on the Product displayed in the Search results
        productPage = await searchResultsPage.selectProduct(data.product);
        // 4. Hover the mouse cursor on 'Compare this Product' option from the displayed Product Display Page (Validate ER-1)
        await productPage.hoverOnCompareProduct();
        // 5. Select 'Compare this Product' option  (Validate ER-2)
        const message = await productPage.compareProductInProductScreen();
        expect(message).toBeTruthy();

        // 6. Click on 'product comparision' link from the displayed success message (Validate ER-3)
        productComparison = await productPage.clickProductComparisonFromSuccessMsg();
        
        await productComparison.verifyTitle('Product Comparison')



    })
}




