import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import HttpClient from "../http-client";
import Utils from "../../common/utils";
import { API_URL } from "../../enum/api.enum";


export default class PuchasedBooksApi {
    static apiURL = API_URL;

    static getListPuchasedBook(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${PuchasedBooksApi.apiURL.HOST}/${this.apiURL.GET_PURCHASED_BOOKS}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


}