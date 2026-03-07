import { test, expect } from '../fixtures/authFixtures';
import { BasePage } from '../utils/CommonFunctions';

const testData = BasePage.getTestData();

    /*
    TestSteps:
    1. Enter any existing Product name into the Search text box field - <Refer Test Data>
    2. Click on the button having search icon
    3. Click on 'Add to Cart' button on the Product displayed in the Search results
    4. Click on the 'shopping cart!' link in the displayed success message
    5. Click on 'Checkout' button in the 'Shopping Cart' page (Validate ER-1)

    */

    for (const data of testData) {

    test(`Validate navigating to Checkout page from 'Shopping Cart' page for ${data.product}`, async ({ homePage }, use) => {

        await homePage.enterProductName(data.product);
        const searchResultsPage = await homePage.clickSearch();
        await searchResultsPage.ClickOnAddToCart();
        const shoppingCartPage=await searchResultsPage.clickOnShoppingCartLinkInCnfMsg();
        const checkoutPage=await shoppingCartPage.clickOnCheckout();
        

    })
}



