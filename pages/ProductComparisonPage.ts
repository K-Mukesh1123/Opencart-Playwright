import {Page,Locator} from "@playwright/test"

export class ProductComparison{
    private readonly page: Page;
    constructor(page: Page) {
            this.page = page;
        }

     async getTitle(): Promise<string> {
        return this.page.title();
    }

    async verifyTitle(expected: string): Promise<void> {
        const actualTitle = await this.page.title();
        if (!actualTitle.includes(expected)) {
            throw new Error(
                `Title mismatch! Expected to include: "${expected}", but got: "${actualTitle}"`
            );
        }
    }
}