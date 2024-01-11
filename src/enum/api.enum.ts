export enum API_URL {
    HOST = "http://localhost:2206",
    IMAGE = "images",
    LOGIN = "users/login",
    REGISTER = "users/register",
    REFRESH_TOKEN = "users/refreshtoken",
    GET_USER_INFO = "users/profile",
    CHANGE_PASSWORD = "users/changepassword",
    GET_HOME = "books/home",
    GET_HOME_RECOMMEND = "books/recommend",
    GET_DETAIL_BOOK = "books/by-id",
    GET_RATES = "rates",
    GET_CART_QUANTITY = "carts/cart-quantity",
    CART = "carts",
    CLEAR_CART ="carts/clear-cart",
    DELETE_ONE_BOOK_IN_CART = "carts/book",
    FILE_BOOK = "files",
    VNPAY = "VNPays",
    RESET_PASSWORD = "users/rs-password",
    FORGOT_PASSWORD = "users/forgot-password",
    GET_PURCHASED_BOOKS = "puchaseHistory",
    FILTER_BOOK = "books/filter",
    LIST_CATEGORY = "category/list-category",
    GET_RECOMMEND_DETAIL_BOOK = 'books/recommendDetailBook',
    GET_CODE_PDF = 'files/check-file',
}

