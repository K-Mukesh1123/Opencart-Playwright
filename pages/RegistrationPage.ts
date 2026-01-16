import {expect,Locator, Page} from "@playwright/test";

export class RegistrationPage{
    private readonly page:Page;

    //define Locators:
    private readonly txtFirstname:Locator;
    private readonly txtLastname:Locator;
    private readonly txtEmail:Locator;
    private readonly txtTelephone:Locator;
    private readonly txtPassword:Locator;
    private readonly txtConfirmPassword:Locator;
    private readonly chkdPolicy:Locator;
    private readonly btnContinue:Locator;
    private readonly msgConfirmation:Locator;


    //Constructor:
    constructor (page:Page){
        this.page=page;
        //intialise locators
        this.txtFirstname=page.locator("input#input-firstname");
        this.txtLastname=page.locator("input#input-lastname");
        this.txtEmail=page.locator("input#input-email");
        this.txtTelephone=page.locator("input#input-telephone");
        this.txtPassword=page.locator("input#input-password");
        this.txtConfirmPassword=page.locator("input#input-confirm");
        this.chkdPolicy=page.locator("input[name='agree']");
        this.btnContinue=page.locator("input[value='Continue']");
        this.msgConfirmation=page.locator("h1:has-text('Your Account Has Been Created!')")

    }

    /**
    * Sets the firstname in the registration form
    * @param fname-Firstname to enter
    */

    async setFirstName(fname:string):Promise<void>{
        await this.txtFirstname.fill(fname);
    }


    /**
    * Sets the lastname in the registration form
    * @param lname-lastname to enter
    */

    async setlastName(lname:string):Promise<void>{
        await this.txtLastname.fill(lname);
    }


    /**
    * Sets the email in the registration form
    * @param email-email to enter
    */

    async setEmail(email:string):Promise<void>{
        await this.txtEmail.fill(email);
    }


    /**
    * Sets the telephone in the registration form
    * @param telephone-telephone to enter
    */

    async setTelephone(telephone:string):Promise<void>{
        await this.txtTelephone.fill(telephone);
    }



    /**
    * Sets the password in the registration form
    * @param password-password to enter
    */

    async setPassword(password:string):Promise<void>{
        await this.txtPassword.fill(password);
    }


    /**
    * Sets the conifrm password in the registration form
    * @param confirmPassword-confirmPassword to enter
    */

    async setConfirmPassword(confirmPassword:string):Promise<void>{
        await this.txtConfirmPassword.fill(confirmPassword);
    }


    /**
    * Sets the checked policy in the registration form
    */

    async setPrivacyPolicy():Promise<void>{
        await this.chkdPolicy.click();
    }


    /**
    * click the continue in the registration form
    
    */

    async clickContinue():Promise<void>{
        await this.btnContinue.click();
    }


    /**
    * get the confirmation message txt
    * @returns Promise<string>-Confirmation message text
    */

    async getConfirmationMsg():Promise<string>{
        return await this.msgConfirmation.textContent() ?? '';
    }



    /**
     * Complete registraion workflow
     * @param userData - Object containing registration data
     */

    async completeRegistraion(userdata:{
        firstName:string;
        lastName:string;
        email:string;
        telephone:string;
        password:string;
    }):Promise<void>{
        await this.setFirstName(userdata.firstName);
        await this.setlastName(userdata.lastName);
        await this.setEmail(userdata.email);
        await this.setTelephone(userdata.telephone);
        await this.setPassword(userdata.password);
        await this.setConfirmPassword(userdata.password);
        await this.setPrivacyPolicy();
        await this.clickContinue();
        await expect(this.msgConfirmation).toBeVisible();

    }

}