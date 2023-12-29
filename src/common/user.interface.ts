export interface IUser {
    id: string;
    name: string;
}


export interface ActiveAccountRequest {
    email: string;
    activeCode: string;
}

export interface IUserInfo {
    id: string,
    email : string,
    fullName : string,
    phoneNumber : string,
}