import {Page} from "@playwright/test";
import { DataProvider } from "./dataProvider";

export class BasePage{

    protected page:Page;

    protected static readonly jsonPath="testdata/searchProduct.json";
    protected static readonly jsonTestData=DataProvider.getTestDataFromJson(BasePage.jsonPath);
    
    constructor(page:Page){
        
        this.page=page;
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    static getTestData(){
        return this.jsonTestData;
    }



}