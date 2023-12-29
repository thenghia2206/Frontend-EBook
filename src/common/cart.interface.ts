import { IBookInCart } from "./book.interface";
import { IUserInfo } from "./user.interface";

export interface ICart{
    id : string,
    totalPrice : number,
    user : IUserInfo,
    books : IBookInCart[],
    createdAt : Date,
    updatedAt : Date,
}