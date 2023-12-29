import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import HttpClient from "../http-client";
import Utils from "../../common/utils";
import { API_URL } from "../../enum/api.enum";


export default class BookApi {
    static apiURL = API_URL;

    static getHome(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.GET_HOME}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getRecommend(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.GET_HOME_RECOMMEND}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getDetailBook(id: string): Observable<any> {
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.GET_DETAIL_BOOK}/${id}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


    static getRate(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.GET_RATES}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getFileBook(body: any): Observable<any> {
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.FILE_BOOK}/${body}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static createRate(body: any): Observable<any> {
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.GET_RATES}`;
        return HttpClient.post(api,body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }


    static filterBook(body: any): Observable<any> {
        const queryParam = Utils.parseObjectToQueryParameter(body);
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.FILTER_BOOK}${queryParam}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static getRecommendDetailBook(id: string): Observable<any> {
        const api = `${BookApi.apiURL.HOST}/${this.apiURL.GET_RECOMMEND_DETAIL_BOOK}/${id}`;
        return HttpClient.get(api).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

}