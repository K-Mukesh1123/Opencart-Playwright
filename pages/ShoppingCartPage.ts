import { Page, Locator } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage'; // Import CheckoutPage if needed
import { BasePage} from '../utils/CommonFunctions';

export class ShoppingCartPage extends BasePage{
    
    
    // Locators using CSS selectors
    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;
    private readonly cnfMsg:Locator;

    constructor(page: Page) {
        super(page);
        
        // Initialize locators with CSS selectors
        this.lblTotalPrice = page.locator("//*[@id='content']/div[2]/div/table//strong[text()='Total:']//following::td");
        this.btnCheckout = page.locator("a[class='btn btn-primary']");
        this.cnfMsg=page.locator('.alert-danger');
    }

    /**
     * Get the total price from the shopping cart
     * @returns Promise<string | null> - The total price text
     */
    async getTotalPrice(): Promise<string | null> {
        try {
            return await this.lblTotalPrice.textContent();
        } catch (error) {
            console.log(`Unable to retrieve total price: ${error}`);
            return null;
        }
    }

    /**
     * Click on the Checkout button
     * @returns Promise<CheckoutPage> - CheckoutPage instance
     */
    async clickOnCheckout(): Promise<CheckoutPage> {

        await Promise.all([
            this.page.waitForURL('**route=checkout/cart**'),
            this.btnCheckout.click()
        ])
        
        return new CheckoutPage(this.page);
    }

    /**
     * Verify if shopping cart page is loaded
     * @returns Promise<boolean> - true if page is loaded
     */
    async isPageLoaded(): Promise<boolean> {
        try {
            return await this.btnCheckout.isVisible();
        } catch (error) {
            return false;
        }
    }

    
}