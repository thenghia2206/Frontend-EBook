export interface IPuchasedBooks {
    id: string,
    priceBook : number,
    book : IBookInPuchasedBooks,
    rated : boolean,
    createdAt : Date,
    updatedAt : Date,
}

export interface IBookInPuchasedBooks {
    id: string,
    title : string,
    image : string,
}