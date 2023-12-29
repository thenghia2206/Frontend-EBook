import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import HttpClient from "../http-client";
import Utils from "../../common/utils";
import { API_URL } from "../../enum/api.enum";


export default class CategoryApi {
    static apiURL = API_URL;

    static getListCategory(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${CategoryApi.apiURL.HOST}/${this.apiURL.LIST_CATEGORY}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}