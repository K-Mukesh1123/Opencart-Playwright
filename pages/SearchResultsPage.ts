import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage'; // Import ProductPage if needed
import { ShoppingCartPage } from './ShoppingCartPage';
import { BasePage} from '../utils/BasePage';

export class SearchResultsPage extends BasePage{


    // Locators using CSS selectors
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;
    private readonly comapreProductBtn: Locator;
    private readonly cnfMsg: Locator;
    private readonly productComparsionLink: Locator;
    private readonly addToCartBtn: Locator;

    constructor(page: Page) {
        super(page);

        // Initialize locators with CSS selectors
        this.searchPageHeader = page.locator('#content h1');
        this.searchProducts = page.locator('div.row div.product-thumb');
        this.comapreProductBtn = page.locator("button[data-original-title='Compare this Product']");
        this.cnfMsg = page.getByText('Success:')
        this.productComparsionLink = page.locator('.alert-success').getByRole('link', { name: /product comparison|shopping cart/i });
        this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });


    }

    /**
     * Verify if the search results page exists by checking the header text
     * @returns Promise<boolean> - true if the search results page exists
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            const headerText = await this.searchPageHeader.textContent();
            return headerText?.includes('Search -') ?? false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a product exists in the search results by its name
     * @param productName - The name of the product to search for
     * @returns Promise<boolean> - true if the product exists
     */
    async isProductExist(productName: string): Promise<boolean> {
        try {
            const count = await this.searchProducts.count();
            for (let i = 0; i < count; i++) {
                const product = this.searchProducts.nth(i);
                const title = await product.textContent();
                if (title === productName) {
                    return true;
                }
            }
        } catch (error) {
            console.log(`Error checking product existence: ${error}`);
        }
        return false;
    }

    /**
     * Select a product from the search results by its name
     * @param productName - The name of the product to select
     * @returns Promise<ProductPage> - ProductPage instance after selecting the product
     */
    async selectProduct(productName: string): Promise<ProductPage> {
        const count = await this.searchProducts.count();

        for (let i = 0; i < count; i++) {
            const product = this.searchProducts.nth(i);
            if ((await product.textContent()) === productName) {
                await product.click();
                return new ProductPage(this.page);
            }
        }

        throw new Error(`Product not found: ${productName}`);
    }


    /**
     * Get count of products in search results
     * @returns Promise<number> - Number of products found
     */
    async getProductCount(): Promise<number> {
        return await this.searchProducts.count();
    }


    async ClickOnAddToCart(): Promise<void> {

        const count = await this.searchProducts.count();

        for (let i = 0; i < count; i++) {
            const product = this.addToCartBtn.nth(i);

            await product.click();

        }
    }

    async isConfirmationMessageVisible(): Promise<boolean> {
        try {
            return await this.cnfMsg.isVisible();
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }

    }
    async addToCart(): Promise<Locator> {
        const count = await this.searchProducts.count();

        for (let i = 0; i < count; i++) {
            const product = this.addToCartBtn.nth(i);

            await product.click();

        }
        return this.cnfMsg;
    }

    async clickOnShoppingCartLinkInCnfMsg(): Promise<ShoppingCartPage> {
        await Promise.all([
            this.page.waitForURL("**route=checkout/cart**"),
            this.productComparsionLink.click()
        ]);

        return new ShoppingCartPage(this.page);
    }

}