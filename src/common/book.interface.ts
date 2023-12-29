export interface IBookBestSeller {
    id : string,
    title : string,
    price : number,
    view : number,
    sold : number,
    image : string,
    createdAt : Date,
    updatedAt : Date,
}

export interface IBookMostView {
    id : string,
    title : string,
    price : number,
    view : number,
    sold : number,
    image : string,
    createdAt : Date,
    updatedAt : Date,
}

export interface IBookRecommend {
    id : string,
    title : string,
    price : number,
    view : number,
    sold : number,
    image : string,
    createdAt : Date,
    updatedAt : Date,
}

export interface IBook{
    id : string,
    title : string,
    description : string,
    price : number,
    view : number,
    sold : number,
    rate : number,
    totalReview : number,
    totalRate : number,
    createdAt : Date,
    updatedAt : Date
}

export interface IDetailBook{
    id : string,
    title : string,
    description : string,
    price : number,
    rate : number,
    sold : number,
    totalRate : number,
    totalReview : number,
    view : number,
    authors : IAuthor[],
    categories : ICategory[],
    publisher : IPublisher,
    image : IImage[],
    createdAt : Date,
    updatedAt : Date,
}

export interface IImage {
    id : string,
    isMain : boolean,
    image : string,
}

export interface IPublisher {
    id : string,
    name : string,
}

export interface ICategory {
    id : string,
    name : string,
}

export interface IAuthor{
    id : string,
    fullName : string,
}

export interface IRate{
    id : string,
    description : string,
    start : number,
    nameUser : string,
    createdAt : Date,
    updatedAt : Date,
}


export interface IBookInCart{
    id : string,
    title : string,
    price : number,
    image : string,
    createdAt : Date,
    updatedAt : Date,
}

export interface IFilterBook{
    id : string,
    title : string,
    price : number,
    image : string,
    view : number,
    sold : number,
    createdAt : Date,
    updatedAt : Date,
}


export interface ICurrentSearchValue {
    size? : number,
    offset? : number,
    search? : string,
    categoryId? : string,
    authorId? : string,
    publisherId? : string,
    sortBy? : string,
    sortOrder? : string,
}


