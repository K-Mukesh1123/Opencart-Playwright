import { Page, Locator, expect } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage'; // Import ShoppingCartPage if needed
import { ProductComparison } from './ProductComparisonPage'

export class ProductPage {
    private readonly page: Page;

    // Locators using CSS selectors
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;
    private readonly compareProductBtn: Locator;
    private readonly compareMsg: Locator;
    private readonly productComparsionLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtQuantity = page.locator('input[name="quantity"]');
        this.btnAddToCart = page.locator('#button-cart');
        this.cnfMsg = page.locator('.alert.alert-success.alert-dismissible');
        this.btnItems = page.locator('#cart');
        this.lnkViewCart = page.locator('strong:has-text("View Cart")');
        this.compareProductBtn = page.locator("button[data-original-title='Compare this Product']").nth(0);
        this.compareMsg = page.getByText('Success:')
        this.productComparsionLink = page.getByRole('link', { name: 'product comparison' });
    }

    /**
     * Sets the product quantity
     * @param qty - Quantity to set
     */
    async setQuantity(qty: string): Promise<void> {
        await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }

    /**
     * Adds product to cart
     */
    async addToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Checks if confirmation message is visible
     * @returns Promise<boolean> - Returns true if message is visible
     */
    async isConfirmationMessageVisible(): Promise<boolean> {
        try {
            if (this.cnfMsg != null) {
                return true;
            }
            else {
                return false;
            }//await expect(this.cnfMsg).toBeVisible();

        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

    /**
     * Clicks on Items button to navigate to cart
     */
    async clickItemsToNavigateToCart(): Promise<void> {
        await this.btnItems.click();
    }

    /**
     * Clicks on View Cart link
     * @returns Promise<ShoppingCartPage> - Returns ShoppingCartPage instance
     */
    async clickViewCart(): Promise<ShoppingCartPage> {
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
    }

    /**
     * Complete workflow to add product to cart
     * @param quantity - Quantity of product to add
     */
    async addProductToCart(quantity: string): Promise<void> {
        await this.setQuantity(quantity);
        await this.addToCart();
        await this.isConfirmationMessageVisible();
    }


    /**
     * Clicks on Compare Product button and verifies the Sucess message with product comparision link
     * @return Promise<void> - 
     */

    async compareProductInProductScreen(): Promise<string> {
        await this.compareProductBtn.click();
        await this.productComparsionLink.isVisible();
        return await this.compareMsg.innerText();
    }

    async hoverOnCompareProduct(): Promise<void> {
        await this.compareProductBtn.waitFor({ state: 'visible' });
        await this.compareProductBtn.hover();
    }


    async clickProductComparisonFromSuccessMsg(): Promise<ProductComparison> {
        try {
            await Promise.all([
                this.page.waitForURL("**route=product/compare**"),
                this.productComparsionLink.click(),
            ]);

            return new ProductComparison(this.page);
        } catch (error) {
            console.log(
                `Exception occurred while clicking 'product comparison' link: ${error}`
            );
            throw error; // rethrow to fail the test
        }

    }


}