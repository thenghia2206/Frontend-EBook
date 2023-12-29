import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import HttpClient from "../http-client";
import Utils from "../../common/utils";
import { API_URL } from "../../enum/api.enum";


export default class CartApi {
    static apiURL = API_URL;

    static getCartQuantity(): Observable<any> {
        const api = `${CartApi.apiURL.HOST}/${this.apiURL.GET_CART_QUANTITY}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getCart(): Observable<any> {
        const api = `${CartApi.apiURL.HOST}/${this.apiURL.CART}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static addBooksToCart(body: any): Observable<any> {
        const api = `${CartApi.apiURL.HOST}/${this.apiURL.CART}`;
        return HttpClient.post(api,body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static clearCart(): Observable<any> {
        const api = `${CartApi.apiURL.HOST}/${this.apiURL.CLEAR_CART}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static deleteOneBookInCart(body: any): Observable<any> {
        const api = `${CartApi.apiURL.HOST}/${this.apiURL.DELETE_ONE_BOOK_IN_CART}/${body}`;
        return HttpClient.delete(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}