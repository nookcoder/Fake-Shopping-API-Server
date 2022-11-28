export interface ICreateNewUser {
    name: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    address: string | undefined;
    account: string | undefined;
    password: string | undefined;
}

export interface ILoginInput {
    account: string;
    password: string;
}
