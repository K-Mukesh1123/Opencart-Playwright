import {Page} from "@playwright/test";

export class Base{

    protected page:Page;
    
    constructor(page:Page){
        
        this.page=page;
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }



}