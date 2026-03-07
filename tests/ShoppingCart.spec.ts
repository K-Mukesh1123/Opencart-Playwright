/**
 * Scenario: Validate navigating to 'Shopping Cart' page from the Success message
 * 
 * Steps:
 * 1. Enter any existing Product name into the Search text box field - <Refer Test Data>
 * 2. Click on the button having search icon
 * 3. Click on the Product displayed in the Search results
 * 4. Click on 'Add to Cart' button in the displayed 'Product Display' page
 * 5. Click on the 'shopping cart!' link in the displayed success message (Validate ER-1)
 * 
 */
import {test,expect} from "../fixtures/authFixtures";
import { DataProvider } from "../utils/dataProvider";


const jsonPath="testdata/searchProduct.json";
const jsonTestData=DataProvider.getTestDataFromJson(jsonPath);


const filePath="../testdata/MOCK_DATA.xlsx";

const excelTestData=DataProvider.gettestDataFromExcel(filePath,'data');

for(const data of jsonTestData){

    test(`Validate the Items- ${data.product} in shopping cart`, async ({homePage},use)=>{


      await homePage.enterProductName(data.product);
      const searchResultsPage=await homePage.clickSearch();
      const productPage=await searchResultsPage.selectProduct(data.product);
      const cnfMsg=await productPage.addToCart();
      await expect(cnfMsg).toBeVisible();      
      const ShoppingCartPage=await productPage.clickShoppingCart();        

    });

    test.only(`Validate navigating to 'Shopping Cart' page from the 'Shopping Cart' header option for ${data.product}`, async({homePage,myAccountPage},use)=>{

      await homePage.enterProductName(data.product);
      const searchResultsPage=await homePage.clickSearch();
      expect (await searchResultsPage.getPageTitle()).toContain(`Search - ${data.product}`);
      await searchResultsPage.ClickOnAddToCart();
      await searchResultsPage.isConfirmationMessageVisible();
      const shoppingCartPage=await searchResultsPage.clickOnShoppingCartLinkInCnfMsg();

      expect(await shoppingCartPage.getPageTitle()).toContain("Shopping Cart");


    })

};








