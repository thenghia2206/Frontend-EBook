import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckboxOptionType, notification } from "antd";
import {
    catchError,
    concatMap,
    filter,
    mergeMap,
    switchMap
} from "rxjs/operators";
import { RootEpic } from "../../common/define-type";
import { IBookBestSeller, IBookMostView, IBookRecommend, ICurrentSearchValue, IDetailBook, IFilterBook, IRate } from "../../common/book.interface";
import BookApi from "../../api/book/book.api";
import CartApi from "../../api/cart/cart.api";
import { ICart } from "../../common/cart.interface";
import VNPayApi from "../../api/vnpay/vnpay.api";
import Utils from "../../common/utils";
import UserApi from "../../api/user/user.api";
import { IPuchasedBooks } from "../../common/puchasedBooks.interface";
import PuchasedBooksApi from "../../api/puchasedBooks/puchasedBooks";
import { QUERY_PARAM, QUERY_PARAM_FILTER } from "../../constants/get-api.constants";
import { ICategory } from "../../common/category.interface";
import CategoryApi from "../../api/category/category.api";



type MessageLogin = {
    content: string;
    errorCode?: number;
};
type MessageForgot = {
    ErrorCode?: number;
    Message: string;
};

interface BookState {
    loading: boolean;
    listBookBestSeller : IBookBestSeller[],
    totalBookBestSeller : number,
    listBookMostView : IBookMostView[],
    totalBookMostView : number,
    listBookRecommend : IBookRecommend[],
    totalBookRecommend : number,
    detailBook? : IDetailBook;
    listRate : IRate[],
    totalRate : number,
    totalRate1 : number,
    totalRate2 : number,
    totalRate3 : number,
    totalRate4 : number,
    totalRate5 : number,
    cartQuantity : number,
    fileBook : string | undefined,
    cart : ICart | undefined,
    vnpayLink: string,
    profile : any | undefined,
    listPuchasedBook : IPuchasedBooks[],
    totalPuchasedBooks : number,
    currentSearchValue: any,
    listFilterBook : IFilterBook[],
    totalFilterBook : number,
    listCategory : ICategory[],
    listBookRecommendByDetailBook : IBookRecommend[],
}

let initState: BookState = {
    loading: false,
    listBookBestSeller : [],
    listBookMostView : [],
    totalBookBestSeller : 0,
    totalBookMostView : 0,
    listBookRecommend : [],
    totalBookRecommend : 0,
    detailBook : undefined,
    listRate : [],
    totalRate : 0,
    totalRate1 : 0,
    totalRate2 : 0,
    totalRate3 : 0,
    totalRate4 : 0,
    totalRate5 : 0,
    cartQuantity : 0,
    fileBook : undefined,
    cart : undefined,
    vnpayLink : "",
    profile : undefined,
    listPuchasedBook : [],
    totalPuchasedBooks : 0,
    currentSearchValue: {
        search: '',
        categoryId : '',
        authorId : '',
        publisherId : '',
        sortBy : '',
        sortOrder : '',
    },
    listFilterBook : [],
    totalFilterBook : 0,
    listCategory : [],
    listBookRecommendByDetailBook : [],
}



export const bookSlice = createSlice({
    name: "book",
    initialState: initState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },


        getBookBestSellerRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getBookBestSellerSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listBookBestSeller = action.payload.items
            if(action.payload.total){
                state.totalBookBestSeller = action.payload.total
            }else{
                state.totalBookBestSeller = 0
            }  
        },

        getBookBestSellerFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getBookMostViewRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getBookMostViewSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listBookMostView = action.payload.items
            if(action.payload.total){
                state.totalBookMostView = action.payload.total
            }else{
                state.totalBookMostView = 0
            }  
        },

        getBookMostViewFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getRecommendRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getRecommendSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listBookRecommend = action.payload.items
            if(action.payload.total){
                state.totalBookRecommend= action.payload.total
            }else{
                state.totalBookRecommend = 0
            }  
        },

        getRecommendFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        getDetailBookRequests(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getDetailBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.detailBook = action.payload

        },
        getDetailBookFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getRatesRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getRatesSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listRate = action.payload.items
            state.totalRate1 = action.payload.totalRate1
            state.totalRate2 = action.payload.totalRate2
            state.totalRate3 = action.payload.totalRate3
            state.totalRate4 = action.payload.totalRate4
            state.totalRate5 = action.payload.totalRate5
            if(action.payload.total){
                state.totalRate= action.payload.total
            }else{
                state.totalRate = 0
            }  
        },

        getRatesFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getCartQuantityRequest(state) {
            state.loading = true;
        },

        getCartQuantitySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.cartQuantity = action.payload.quantity
        },

        getCartQuantityFail(state, action: PayloadAction<any>) {
            state.loading = false;

        },


        addBookToCartRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        addBookToCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        addBookToCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        getFileBookRequests(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getFileBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.fileBook = action.payload

        },
        getFileBookFail(state, action: PayloadAction<any>) {
            state.loading = false;

        },


        getCartRequest(state) {
            state.loading = true;
        },

        getCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.cart = action.payload
        },

        getCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        deleteBookInCartRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        deleteBookInCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        deleteBookInCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        clearCartRequest(state) {
            state.loading = true;
        },

        clearCartSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
        },

        clearCartFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        paymentRequest(state,action: PayloadAction<any>) {
            state.loading = true;
        },

        paymentSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.vnpayLink = action.payload;
        },

        paymentFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        //Get profile
        getProfileRequest(state) {
            state.loading = true;
        },

        getProfileSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.profile = action.payload
            Utils.setLocalStorage("userName", action.payload.fullName);
            
        },

        getProfileFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getPuchasedBooksRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getPuchasedBooksSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listPuchasedBook = action.payload.items
            if(action.payload.total){
                state.totalPuchasedBooks = action.payload.total
            }else{
                state.totalPuchasedBooks = 0
            }  
        },

        getPuchasedBooksFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        createRateRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        createRateSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Đánh giá sách thành công!",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },

        createRateFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        // Dùng để reset lại biến currentSearchValue (biến lưu lại các lựa chọn tìm kiếm nâng cao) mỗi khi chuyển qua chuyển lại giữa
        // trang home và trang tìm kiếm nâng cao
        // action.payload bây giờ sẽ là thông tin mà bạn muốn tìm kiếm sau khi clear giá trị tìm kiếm cũ
        resetCurrentSearchValueRequest(state) {
            console.log("rs")
            state.currentSearchValue = {
                search: '',
                categoryId : '',
                authorId : '',
                publisherId : '',
                sortBy : '',
                sortOrder : '',
            }
        },

        advancedSearchingRequest(
            state,
            action: PayloadAction<ICurrentSearchValue>
        ) {
            state.currentSearchValue = {
                // Xu ly de lay duoc ca gia tri cua o input cua header va cac o selectbox cua filter. Neu co
                // truong nao khong co gia tri thi lay gia tri hien tai duoc luu trong redux
                search: action.payload.search
                    ? action.payload.search
                    : state.currentSearchValue.search,
                categoryId: action.payload.categoryId
                    ? action.payload.categoryId
                    : state.currentSearchValue.categoryId,
                authorId: action.payload.authorId
                    ? action.payload.authorId
                    : state.currentSearchValue.authorId,
                publisherId: action.payload.publisherId
                    ? action.payload.publisherId
                    : state.currentSearchValue.publisherId,
                sortBy: action.payload.sortBy
                    ? action.payload.sortBy
                    : state.currentSearchValue.sortBy,
                sortOrder: action.payload.sortOrder
                    ? action.payload.sortOrder
                    : state.currentSearchValue.sortOrder,
            };
        },

        advancedSearchingSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listFilterBook = action.payload?.data?.items;
            state.totalFilterBook = action.payload.data.total
        },

        advancedSearchingFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },


        getCategoriesRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getCategoriesSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listCategory = action.payload.items
        },

        getCategoriesFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getRecommendByDetailBookRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getRecommendByDetailBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listBookRecommendByDetailBook = action.payload.items
        },

        getRecommendByDetailBookFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

    },
});


const getBookBestSeller$: RootEpic = (action$) =>
    action$.pipe(
        filter(getBookBestSellerRequest.match),
        mergeMap((re) => {
            return BookApi.getHome(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        bookSlice.actions.getBookBestSellerSuccess(res.data),

                    ];
                }),
                catchError((err) => [bookSlice.actions.getBookBestSellerFail(err)])
            );
        })
);

const getBookMostView$: RootEpic = (action$) =>
    action$.pipe(
        filter(getBookMostViewRequest.match),
        mergeMap((re) => {
            return BookApi.getHome(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        bookSlice.actions.getBookMostViewSuccess(res.data),

                    ];
                }),
                catchError((err) => [bookSlice.actions.getBookMostViewFail(err)])
            );
        })
);


const getRecommend$: RootEpic = (action$) =>
    action$.pipe(
        filter(getRecommendRequest.match),
        mergeMap((re) => {
            return BookApi.getRecommend(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        bookSlice.actions.getRecommendSuccess(res.data),

                    ];
                }),
                catchError((err) => [bookSlice.actions.getRecommendFail(err)])
            );
        })
);

const getDetailBook$: RootEpic = (action$) =>
action$.pipe(
    filter(getDetailBookRequests.match),
    mergeMap((re) => {
        return BookApi.getDetailBook(re.payload.id).pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.getDetailBookSuccess(res.data),

                ];
            }),
            catchError((err) => [bookSlice.actions.getDetailBookFail(err)])
        )
    })
);

const getRecommendByDetailBook$: RootEpic = (action$) =>
    action$.pipe(
        filter(getRecommendByDetailBookRequest.match),
        mergeMap((re) => {
            return BookApi.getRecommendDetailBook(re.payload.id).pipe(
                mergeMap((res: any) => {
                    return [
                        bookSlice.actions.getRecommendByDetailBookSuccess(res.data),

                    ];
                }),
                catchError((err) => [bookSlice.actions.getRecommendByDetailBookFail(err)])
            );
        })
);


const getRates$: RootEpic = (action$) =>
    action$.pipe(
        filter(getRatesRequest.match),
        mergeMap((re) => {
            return BookApi.getRate(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        bookSlice.actions.getRatesSuccess(res.data),

                    ];
                }),
                catchError((err) => [bookSlice.actions.getRatesFail(err)])
            );
        })
);


const getFileBook$: RootEpic = (action$) =>
action$.pipe(
    filter(getFileBookRequests.match),
    mergeMap((re) => {
        return BookApi.getFileBook(re.payload.id).pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.getFileBookSuccess(res.data),

                ];
            }),
            catchError((err) => [bookSlice.actions.getFileBookFail(err)])
        )
    })
);

const deleteBookInCart$: RootEpic = (action$) =>
action$.pipe(
    filter(deleteBookInCartRequest.match),
    mergeMap((re) => {
        return CartApi.deleteOneBookInCart(re.payload.id).pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.deleteBookInCartSuccess(res.data),
                    bookSlice.actions.getCartRequest(),
                    bookSlice.actions.getCartQuantityRequest()

                ];
            }),
            catchError((err) => [bookSlice.actions.deleteBookInCartFail(err)])
        )
    })
);


const clearCart$: RootEpic = (action$) =>
action$.pipe(
    filter(clearCartRequest.match),
    mergeMap((re) => {
        return CartApi.clearCart().pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.clearCartSuccess(res.data),
                    bookSlice.actions.getCartRequest(),
                    bookSlice.actions.getCartQuantityRequest()

                ];
            }),
            catchError((err) => [bookSlice.actions.clearCartFail(err)])
        )
    })
);


const getCartQuantity$: RootEpic = (action$) =>
action$.pipe(
    filter(getCartQuantityRequest.match),
    mergeMap((re) => {
        return CartApi.getCartQuantity().pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.getCartQuantitySuccess(res.data),

                ];
            }),
            catchError((err) => [bookSlice.actions.getCartQuantityFail(err)])
        )
    })
);

const addBookToCart$: RootEpic = (action$) =>
    action$.pipe(
        filter(addBookToCartRequest.match),
        mergeMap((re) => {
            return CartApi.addBooksToCart(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        bookSlice.actions.addBookToCartSuccess(res.data),
                        bookSlice.actions.getCartQuantityRequest()
                    ];
                }),
                catchError((err) => [bookSlice.actions.addBookToCartFail(err)])
            );
        })
);

const getCart$: RootEpic = (action$) =>
action$.pipe(
    filter(getCartRequest.match),
    mergeMap((re) => {
        return CartApi.getCart().pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.getCartSuccess(res.data),

                ];
            }),
            catchError((err) => [bookSlice.actions.getCartFail(err)])
        )
    })
);


const createPayment$: RootEpic = (action$) =>
action$.pipe(
    filter(paymentRequest.match),
    mergeMap((re) => {
        return VNPayApi.createPayment(re.payload).pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.paymentSuccess(res),
                ];
            }),
            catchError((err) => [bookSlice.actions.paymentFail(err)])
        )
    })
);

//Profile
const getProfile$: RootEpic = (action$) =>
action$.pipe(
    filter(getProfileRequest.match),
    mergeMap((re) => {
        return UserApi.getUserInfor().pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.getProfileSuccess(res.data),

                ];
            }),
            catchError((err) => [bookSlice.actions.getProfileFail(err)])
        );
    })
);

const createRate$: RootEpic = (action$) =>
action$.pipe(
    filter(createRateRequest.match),
    mergeMap((re) => {
        const bodyRequest = {
            size : QUERY_PARAM.size,
            offset : 0
        }
        return BookApi.createRate(re.payload).pipe(
            mergeMap((res: any) => {
                return [
                    bookSlice.actions.createRateSuccess(res),
                    bookSlice.actions.getPuchasedBooksRequest(bodyRequest)
                ];
            }),
            catchError((err) => [bookSlice.actions.createRateFail(err)])
        )
    })
);

const getPuchasedBooks$: RootEpic = (action$) =>
    action$.pipe(
        filter(getPuchasedBooksRequest.match),
        mergeMap((re) => {
            return PuchasedBooksApi.getListPuchasedBook(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        bookSlice.actions.getPuchasedBooksSuccess(res.data),
                    ];
                }),
                catchError((err) => [bookSlice.actions.getPuchasedBooksFail(err)])
            );
        })
);


const advancedSearchBook$: RootEpic = (action$) =>
    action$.pipe(
        filter(advancedSearchingRequest.match),
        switchMap((re) => {
            const bodyrequest = {
                size: re.payload.size,
                offset: re.payload.offset,
                search: re.payload.search ? re.payload.search : "",
                categoryId: re.payload.categoryId ? re.payload.categoryId : "",
                authorId: re.payload.authorId
                    ? re.payload.authorId
                    : "",
                publisherId: re.payload.publisherId ? re.payload.publisherId : "",
                sortBy: re.payload.sortBy ? re.payload.sortBy : '',
                sortOrder: re.payload.sortOrder ? re.payload.sortOrder : '',

            };

            return BookApi.filterBook(bodyrequest).pipe(
                mergeMap((res: any) => {
                    return [bookSlice.actions.advancedSearchingSuccess(res)];
                }),
                catchError((err) => [
                    bookSlice.actions.advancedSearchingFail(err)
                ])
            );
        })
    );


const getCategories$: RootEpic = (action$) =>
    action$.pipe(
        filter(getCategoriesRequest.match),
        mergeMap((re) => {
            return CategoryApi.getListCategory(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        bookSlice.actions.getCategoriesSuccess(res.data),

                    ];
                }),
                catchError((err) => [bookSlice.actions.getCategoriesFail(err)])
            );
        })
);


const resetCurrentSearchValue$: RootEpic = (action$) =>
    action$.pipe(
        filter(resetCurrentSearchValueRequest.match),
        mergeMap((re) => {
            const bodyrequest: ICurrentSearchValue = {
                size : QUERY_PARAM_FILTER.size,
                offset : 0,
                search: "",
                categoryId : '',
                authorId : '',
                publisherId : '',
                sortBy : '',
                sortOrder : '',
            };
            return [
                bookSlice.actions.advancedSearchingRequest(bodyrequest),
            ];
        })
    )


export const BookEpics = [
    getBookBestSeller$,
    getBookMostView$,
    getRecommend$,
    getDetailBook$,
    getRates$,
    getCartQuantity$,
    addBookToCart$,
    getFileBook$,
    getCart$,
    deleteBookInCart$,
    clearCart$,
    createPayment$,
    getProfile$,
    getPuchasedBooks$,
    createRate$,
    advancedSearchBook$,
    getCategories$,
    resetCurrentSearchValue$,
    getRecommendByDetailBook$,
];

export const {
    getBookBestSellerRequest,
    getBookMostViewRequest,
    getRecommendRequest,
    getDetailBookRequests,
    getRatesRequest,
    getCartQuantityRequest,
    addBookToCartRequest,
    getFileBookRequests,
    getCartRequest,
    deleteBookInCartRequest,
    clearCartRequest,
    paymentRequest,
    getProfileRequest,
    getPuchasedBooksRequest,
    createRateRequest,
    advancedSearchingRequest,
    getCategoriesRequest,
    resetCurrentSearchValueRequest,
    getRecommendByDetailBookRequest,
} = bookSlice.actions;
export const bookReducer = bookSlice.reducer;