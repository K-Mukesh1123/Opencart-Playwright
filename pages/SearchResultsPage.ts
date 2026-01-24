import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage'; // Import ProductPage if needed

export class SearchResultsPage {
    private readonly page: Page;

    // Locators using CSS selectors
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;
    private readonly comapreProductBtn: Locator;
    private readonly compareMsg: Locator;
    private readonly productComparsionLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.searchPageHeader = page.locator('#content h1');
        this.searchProducts = page.locator('h4>a');
        this.comapreProductBtn = page.locator("button[data-original-title='Compare this Product']");
        this.compareMsg = page.getByText('Success:')
        this.productComparsionLink = page.getByRole('link', { name: 'product comparison' });


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

}