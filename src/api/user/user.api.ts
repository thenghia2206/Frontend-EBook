import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import HttpClient from "../http-client";
import { API_URL } from "../../enum/api.enum";
import Utils from "../../common/utils";


export default class UserApi {
    static apiURL = API_URL;

    static getUserInfor(): Observable<any> {
        const api = `${UserApi.apiURL.HOST}/${this.apiURL.GET_USER_INFO}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}