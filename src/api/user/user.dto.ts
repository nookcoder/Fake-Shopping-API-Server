import {ICreateNewUser} from "./user.interface";

export class CreateNewUser {
     address: string | undefined;
    account: string | undefined;
    name: string | undefined;
    password: string | undefined;
    phone: string | undefined;
    email: string | undefined;

    constructor(input: ICreateNewUser) {
        this.name = input.name;
        this.phone = input.phone;
        this.email = input.email;
        this.address = input.address;
        this.account = input.account;
        this.password = input.password;
    }
}