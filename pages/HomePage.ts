import {Page,expect, Locator} from '@playwright/test';

export class HomePage {

private readonly page: Page;
//locators
private readonly lnkMyAccount: Locator;
private readonly linkLogin: Locator;
private readonly lnkRegister: Locator;
private readonly txtSearchbox: Locator;
private readonly btnSearch: Locator;

    //constructors:

constructor(page:Page){
    this.page=page;
    this.lnkMyAccount=page.locator("//span[text()='My Account']");
    this.lnkRegister=page.getByText('Register', { exact: true });
    this.linkLogin=page.getByText('Login', { exact: true });
    this.btnSearch=page.locator("#search button[type='button']");
    this.txtSearchbox=page.locator("input[placeholder='Search']");
    
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

async enterProductName(){
    try{
        await this.txtSearchbox.click();
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
    }catch(error){
        console.log(`Exception occured whle clicking 'Search': ${error}`);
        throw error;
    }
}



}