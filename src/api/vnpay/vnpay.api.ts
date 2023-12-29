import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import HttpClient from "../http-client";
import Utils from "../../common/utils";
import { API_URL } from "../../enum/api.enum";


export default class VNPayApi {
    static apiURL = API_URL;

    static createPayment(body: any): Observable<any> {
        const api = `${VNPayApi.apiURL.HOST}/${this.apiURL.VNPAY}`;
        return HttpClient.post(api,body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}