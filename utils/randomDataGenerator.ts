import {faker} from '@faker-js/faker';

export class RandomDataUtil{

    static getRandomFirstname(){
        return faker.person.firstName();
    }

     static getRandomLastname(){
        return faker.person.lastName();
    }

     static getRandomEmail(){
        return faker.internet.email();
    }

     static getRandomTelephone(){
        return faker.phone.number();
    }

     static getRandomPassword(length:number=10):string{
        return faker.internet.password({length});
    }

     static getFirstname(){
        return faker.person.firstName();
    }
}