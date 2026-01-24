/**
 * Test case: Validate the Thumbnails of the Product displayed in the Product Display Page
 * 
 * tags: @master @regression @sanity
 * 
 * Steps:
 * 1. Enter any existing Product name into the Search text box field - <Refer Test Data>
2. Click on the button having search icon
3. Click on the Product displayed in the Search results
4. Click on the main bigger sized Thumbnail image displayed on the 'Product Display Page' (Validate ER-1)
5. Click on '<' and '>' options (Validate ER-2)
6. Click on 'x' option or press 'ESC' keyboard key when the thumbnails are displayed in Light box view (Validate ER-3)
7. Click on the normal sized Thumbnail images and repeat the steps 5 to 6 (Validate ER-4)
 */

import {test,expect} from "@playwright/test"
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { DataProvider } from "../utils/dataProvider";

const jsonpath:string="testdata/searchProduct.json";

const jsonTestData:any=DataProvider.getTestDataFromJson(jsonpath);

let config:TestConfig;
let homePage:HomePage;
let searchResultsPage:SearchResultsPage;
let productPage:ProductPage;

test.beforeEach(async ({page})=>{
        //Navigate to url
       config= new TestConfig();
       await page.goto(config.appUrl);
       //initialse page objects
       homePage=new HomePage(page);       

});

test.afterEach(async ({page})=>{
    await page.close();
});
for (const data of jsonTestData){


test(`Verify Product Thumbnails in Product Comparision Screen with ${data.thumbnail}`, async ()=>{

    // 1. Enter any existing Product name into the Search text box field - <Refer Test Data>
    await homePage.enterProductName(data.product);
    // 2. Click on the button having search icon
    searchResultsPage=await homePage.clickSearch();
    // 3. Click on the Product displayed in the Search results
    productPage=await searchResultsPage.selectProduct(data.product);
    // 4. Click on the main bigger sized Thumbnail image displayed on the 'Product Display Page' (Validate ER-1)
    await productPage.clickOnProductThumbnails(data.thumbnail);
    // 5. Click on '<' and '>' options (Validate ER-2)
    await productPage.clickOnArrowButtons();
    // 6. Click on 'x' option or press 'ESC' keyboard key when the thumbnails are displayed in Light box view (Validate ER-3)
    await productPage.clickCloseButton();
    // 7. Click on the normal sized Thumbnail images and repeat the steps 5 to 6 (Validate ER-4)
    

});

}