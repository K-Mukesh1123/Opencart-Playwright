import {Locator, Page} from "@playwright/test";
import { MyAccountPage } from "./MyAccountPage";

export class MyAccountInformationPage{

    private readonly page:Page;
    private readonly FirstNameTextBox:Locator;
    private readonly LastNameTextBox:Locator;
    private readonly EmailTextBox:Locator;
    private readonly TelephoneTextBox:Locator; 
    private readonly ContinueBtn:Locator;

    constructor(page:Page){
        this.page=page;
        //initilaize Locators
        this.FirstNameTextBox=page.getByRole("textbox",{name:"First Name"});
        this.LastNameTextBox=page.getByRole("textbox",{name:'Last Name'});
        this.EmailTextBox=page.getByRole('textbox',{name:'E-Mail'});
        this.TelephoneTextBox=page.getByRole('textbox',{name:'Telephone'});
        this.ContinueBtn=page.locator("input[value='Continue']");

        
    }
    

    async updateFirstName(FirstName:string):Promise<void>{
        await this.FirstNameTextBox.fill(FirstName);
    }

    async updateLastName(LastName:string):Promise<void>{
        await this.LastNameTextBox.fill(LastName);
    }

    async updateEmail(Email:string):Promise<void>{
        await this.EmailTextBox.fill(Email);
    }

    async updateTelephone(Telephone:string):Promise<void>{
        await this. EmailTextBox.fill(Telephone);
    }

    async updateMyAccountInfo(data:any){
        await this.FirstNameTextBox.fill(data.firstName);
        await this.LastNameTextBox.fill(data.lastName);
        await this.EmailTextBox.fill(data.email);
        await this.TelephoneTextBox.fill(data.telephone);

    }

    async clickOnContinue(){
        await this.ContinueBtn.click();
        return new MyAccountPage(this.page);
    }







}