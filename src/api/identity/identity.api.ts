/* eslint-disable new-parens */
import HttpClient from "../http-client";
import SYSTEM_CONSTANTS from "../../common/constants";

import {
    GetAllMemberReq,
    GetAllMembersWithRoleReq,
    GetAllTaskReq,
} from "../../common/define-type";
import { Observable } from "rxjs/internal/Observable";
import { catchError, map } from "rxjs/operators";
import { API_URL } from "../../enum/api.enum";
import { ActiveAccountRequest } from "../../common/user.interface";

export default class IdentityApi {
    static apiURL = API_URL;

    static login(body: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.LOGIN}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res : any) => (res as any) || null,
                catchError((error : any) => new Observable())
            )
        );
    }

    static reqister(body: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.REGISTER}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res : any) => (res as any) || null,
                catchError((error : any) => new Observable())
            )
        );
    }

    static getUserInfo(token: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.GET_USER_INFO}`;
        return HttpClient.get(api, { headers: { Authorization: `Bearer ${token}` } }).pipe(
            map(
                (res : any) => (res as any) || null,
                catchError((error : any) => new Observable())
            )
        );
    }


    static handleRefreshToken(bodyrequest: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.REFRESH_TOKEN}`;
        return HttpClient.post(api, bodyrequest).pipe(
            map(
                (res : any) => (res as any) || null,
                catchError((error : any) => new Observable())
            )
        );
    }

    static checkActiveAccount(body: ActiveAccountRequest): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${SYSTEM_CONSTANTS.API.IDENTITY.ACTIVE_ACCOUNT}?email=${body.email}&activeCode=${body.activeCode}`;
        return HttpClient.get(api).pipe(
            map((res : any) => res as any || null, catchError((error : any) => new Observable)));
    }

    static editProfile(bodyrequest: any): Observable<any> {
        const finalBodyrequest : any = {
            fullName : bodyrequest?.fullName,
            phoneNumber : bodyrequest?.phoneNumber,
            address : bodyrequest?.address,
            dob : bodyrequest?.dob,
            gender : bodyrequest?.gender
          }
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.GET_USER_INFO}`;
        return HttpClient.put(api,finalBodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static changePassword(bodyrequest: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.CHANGE_PASSWORD}`;
        return HttpClient.put(api,bodyrequest).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static forgotPassword(body: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.FORGOT_PASSWORD}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }

    static resetPassword(body: any): Observable<any> {
        const api = `${IdentityApi.apiURL.HOST}/${this.apiURL.RESET_PASSWORD}`;
        return HttpClient.post(api, body).pipe(
            map(
                (res) => (res as any) || null,
                catchError((error) => new Observable())
            )
        );
    }
}
