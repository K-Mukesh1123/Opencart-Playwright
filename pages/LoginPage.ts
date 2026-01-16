import {Page,Locator} from "@playwright/test";

export class LoginPage{
    private readonly page:Page;

    //Locators:
    private readonly txtuserName:Locator;
    private readonly txtpassword:Locator;
    private readonly btnLogin:Locator;
    private readonly txtErrorMessage:Locator;

    //constructor:

    constructor(page:Page){
        this.page=page;

        //initilaise locators
        this.txtuserName=page.locator("input#input-email");
        this.txtpassword=page.locator("input#input-password");
        this.btnLogin=page.locator("input[value='Login']");
        this.txtErrorMessage=page.getByText('Warning: No match for E-Mail Address and/or Password.');

    }

    /**
     * Enter username
     * @param email - Email Id address to enter
     */

    async setEmail(email:string){
        await this.txtuserName.fill(email);
    }

    /**
     * Enter Password
     * @param password - password to be entered
     */

    async setPassword(password:string){
        await this.txtpassword.fill(password);
    }

    /**
     * click on Login button
     */

    async clickLogin(){
        await this.btnLogin.click();
    }

    
    /**
     * Performs Login action at a go
     */

    async login(email:string,password:string){

        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();

    }

    async getLoginErrorMessage():Promise<null | string>{
        return this.txtErrorMessage.textContent();
    }


}