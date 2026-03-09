import {Page,expect, Locator} from '@playwright/test';
import { SearchResultsPage } from './SearchResultsPage';
import { MyAccountPage } from './MyAccountPage';

export class HomePage {

private readonly page: Page;
//locators
private readonly lnkMyAccount: Locator;
private readonly linkLogin: Locator;
private readonly lnkRegister: Locator;
private readonly txtSearchbox: Locator;
private readonly btnSearch: Locator;
private readonly dropDwnBtnMyAccount:Locator;

    //constructors:

constructor(page:Page){
    this.page=page;
    this.lnkMyAccount=page.locator("//span[text()='My Account']");
    this.lnkRegister=page.getByText('Register', { exact: true });
    this.linkLogin=page.getByText('Login', { exact: true });
    this.btnSearch=page.locator("#search button[type='button']");
    this.txtSearchbox=page.getByPlaceholder('Search');
    this.dropDwnBtnMyAccount=page.locator('ul.dropdown-menu li a').filter({ hasText: 'My Account' })
    
}

//action methods:

//check if HomePage exists
//assertions shouldn't be used in page classes
async isHomePageExists(){
    let title:string =await this.page.title();

    if(title){
        return true;
    }else{
        return false;
    }
}

//Click "My Account" link

async clickMyAccount(){
    try{
        await this.lnkMyAccount.click();
    }catch(error){
        console.log(`Exception occured whle clicking 'My Account': ${error}`);
        throw error;
    }
}


//Click "Register" link

async clickRegister(){
    try{
        await this.lnkRegister.click();
    }catch(error){
        console.log(`Exception occured whle clicking 'Register': ${error}`);
        throw error;
    }
}

//Enter product name in search box

async enterProductName(productName:string){
    try{
        await this.txtSearchbox.fill(productName);
    }catch(error){
        console.log(`Exception occured while entering the product: ${error}`);
        throw error;
    }
}

//click Login:

async clickLogin(){
    try{
        await this.linkLogin.click();
    }catch(error){
        console.log(`Exception occured whle logging in: ${error}`);
        throw error;
    }
}

//click search:

async clickSearch(){
    try{
        await this.btnSearch.click();
        return new SearchResultsPage(this.page);
    }catch(error){
        console.log(`Exception occured whle clicking 'Search': ${error}`);
        throw error;
    }
}

async selectMyAccount(){
    try{
        await this.dropDwnBtnMyAccount.click();
        return new MyAccountPage(this.page)
    }catch(error){
        console.log(`Exception occured while Clicking 'MyAccount' Dropdown option:${error}`);
        throw error;
    }

}



}