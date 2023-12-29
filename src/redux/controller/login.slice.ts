import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
// import IdentityApi from "../../api/identity.api";
import { RootEpic } from "../../common/define-type";
import Utils from "../../common/utils";
import IdentityApi from "../../api/identity/identity.api";
import { bookSlice } from "./book.slice";
import UserApi from "../../api/user/user.api";

type MessageLogin = {
    content: string;
    errorCode?: number;
};
type MessageForgot = {
    ErrorCode?: number;
    Message: string;
};
interface LoginState {
    loading: boolean;
    isSuccess: boolean;
    message: MessageLogin | undefined;
    messageForgot: MessageForgot | undefined;
    departmentId: number;
    refresh_token: string;
    statusCode: string | undefined;
    tokenLogin: string | undefined;
    isExistEmail: boolean;
    registerSuccess: boolean;
    userName: string | undefined;
    userMail: string | undefined;
    userPhone: string | undefined;
    userRole : string | undefined;
    accesstokenExpỉred: boolean;
}

const initState: LoginState = {
    loading: false,
    isSuccess: true,
    userName: Utils.getValueLocalStorage("userName"),
    userMail: Utils.getValueLocalStorage("userMail"),
    userPhone: Utils.getValueLocalStorage("userPhone"),
    userRole:Utils.getValueLocalStorage("userRole"),
    departmentId: 1,
    message: undefined,
    messageForgot: undefined,
    refresh_token: "",
    statusCode: undefined,
    tokenLogin: Utils.getValueLocalStorage("token"),
    isExistEmail: true,
    registerSuccess: false,
    accesstokenExpỉred: true,
};

const loginSlice = createSlice({
    name: "login",
    initialState: initState,
    reducers: {
        loginRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        loginSuccess(state, action: PayloadAction<any>) {
            Utils.setLocalStorage("token", action.payload.accessToken);
            Utils.setLocalStorage("refresh_token", action.payload.refreshToken);
            state.tokenLogin = action?.payload?.accessToken;
            state.loading = false;
            state.isSuccess = true;
            state.accesstokenExpỉred = false;
            notification.open({
                message: "Đăng nhập thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },
        loginFail(state, action: any) {
            state.loading = false;
            state.accesstokenExpỉred = true;

            notification.open({
                message: "Đăng nhập không thành công",
                description: action.payload.response.message.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.message = action.payload.message;
        },
        checkAbleToLogin(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        },
        getUserInfoRequest(state, action: PayloadAction<any>) {
            state.tokenLogin = action.payload.accessToken;
            state.loading = true;
        },
        getUserInfoSuccess(
            state,
            action: PayloadAction<{ user: any; token: string }>
        ) {
            Utils.setLocalStorage("userName", action.payload.user.fullName);
            Utils.setLocalStorage("userMail", action.payload.user.email);
            Utils.setLocalStorage("userRole","user")
            state.userName = action.payload.user.fullName;
            state.userMail = action.payload.user.email;
            state.loading = false;
            state.isSuccess = true;
            state.accesstokenExpỉred = false;
        },
        getUserInfoFail(state, action: any) {
            Utils.removeItemLocalStorage("userName");
            Utils.removeItemLocalStorage("userMail");
            state.message = action.payload.message;
            state.accesstokenExpỉred = true;
            state.loading = false;


        },

        checkEmailRequest: (state, action: PayloadAction<string>) => {
            state.isExistEmail = true;
            state.loading = true;
        },
        checkEmailSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;

            state.isExistEmail = action.payload.exist;
            if (action.payload.exist) {
                notification.open({
                    message: "Email đã tồn tại",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        marginTop: 40,
                    },
                });
            }
        },
        checkEmailFailed(state, action: PayloadAction<boolean>) {
            // state.loading = action.payload;
            state.loading = false;

        },
        checkActiveAccountRequest: (state, action: PayloadAction<any>) => {
            state.loading = true;
        },
        checkActiveAccountSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;

            if (action.payload.statusCode === "OK") {
                notification.open({
                    message: action.payload.data,
                    description: "Tài khoản đã có thể đăng nhập",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        // marginTop: 20
                    },
                });
            }
            if (action.payload.statusCode === "AccountActivated") {
                notification.open({
                    message: action.payload.data,
                    description: "Vui lòng không xác nhận lại",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        // marginTop: 20
                    },
                });
            }
            if (action.payload.statusCode === "UserNotFound") {
                notification.open({
                    message: action.payload.data,
                    description:
                        "Vui lòng đăng ký / đăng nhập lại với tài khoản khác đã xác nhận",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        // marginTop: 20
                    },
                });
            }
        },
        checkActiveAccountFailed(state, action: PayloadAction<boolean>) {
            // state.loading = action.payload;
            state.loading = false;

        },
        forgotRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        sendMailSuccess(
            state,
            action: PayloadAction<any>
        ) {
            state.message = action.payload.message;
            state.loading = false;
            state.isSuccess = true;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        message(state, action: PayloadAction<MessageLogin>) {
            state.message = action.payload;
            state.loading = false;
        },
        messageForgot(state, action: PayloadAction<MessageForgot>) {
            state.messageForgot = action.payload;
            state.loading = false;
        },
        clearMessageResquest(state) {
            state.loading = true;
        },
        clearMessage(state) {
            state.messageForgot = undefined;
            state.message = undefined;
            state.loading = false;
        },
        setStatusCode(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        },
        clearAllRequest(state) {
            state.loading = true;
            state.statusCode = undefined;
            // state.user = undefined;
        },

        registerRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            state.registerSuccess = false;
        },

        registerSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            notification.open({
                message: action.payload.data.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.registerSuccess = true;
        },

        registerFail(state, action: PayloadAction<any>) {
    

            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Đăng ký không thành công!",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
            state.registerSuccess = false;
        },

        changePasswordRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        changePasswordSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            notification.open({
                message: 'Đổi mật khẩu thành công!',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        changePasswordFail(state, action: PayloadAction<any>) {

            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Đổi mật khẩu không thành công!",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
        },

        editProfileRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            
        },

        editProfileSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            Utils.setLocalStorage("userName",action.payload.fullName)
            state.userName = action.payload.fullName
            notification.open({
                message: "Thành công",
                description: "Cập nhật thông tin thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            
        },

        editProfileFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Cập nhật thông tin thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        resetPasswordRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        resetPasswordSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Tạo lại mật khẩu thành công!',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        resetPasswordFail(state, action: PayloadAction<any>) {
            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Tạo lại mật khẩu không thành công!",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
        },

        forgotPasswordRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        forgotPasswordSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Quên mật khẩu thành công. Vui lòng kiểm tra email để tạo lại mật khẩu!',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        forgotPasswordFail(state, action: PayloadAction<any>) {
            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Tạo lại mật khẩu không thành công!",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
        },
    },
});

const login$: RootEpic = (action$) =>
    action$.pipe(
        filter(loginRequest.match),
        mergeMap((re : any) => {
            const body: any = {
                email: re.payload.email,
                password: re.payload.password,
                remember: re.payload.remember,
                additionalProp1: {},
            };
            return IdentityApi.login(body).pipe(
                mergeMap((res: any) => {
                    return [
                        loginSlice.actions.loginSuccess(res.data),
                        loginSlice.actions.getUserInfoRequest(res.data.accessToken),
                        loginSlice.actions.setLoading(false),
                        loginSlice.actions.setStatusCode(res.statusCode),
                    ];
                }),
                catchError((err : any) => [loginSlice.actions.loginFail(err)])
            );
        })
    );

const clearMessage$: RootEpic = (action$) =>
    action$.pipe(
        filter(clearMessageResquest.match),
        map(() => {
            return loginSlice.actions.clearMessage();
        })
    );

const logOut$: RootEpic = (action$) =>
    action$.pipe(
        filter(clearAllRequest.match),
        mergeMap(() => {
            return [
                loginSlice.actions.clearAllRequest(),
                loginSlice.actions.setLoading(false),
            ];
        })
    );

const register$: RootEpic = (action$) =>
    action$.pipe(
        filter(registerRequest.match),
        switchMap((re : any) => {
            const body: any = {
                email: re.payload.email,
                password: re.payload.password,
                confirmPassword: re.payload.confirmPassword,
                fullName: re.payload.fullName,
                phoneNumber: re.payload.phoneNumber,
                additionalProp1: {},
            };
            return IdentityApi.reqister(body).pipe(
                mergeMap((res: any) => {
                    return [
                        loginSlice.actions.setLoading(false),
                        loginSlice.actions.setStatusCode(res.statusCode),
                        loginSlice.actions.registerSuccess(res),
                    ];
                }),
                catchError((err : any) => [
                    loginSlice.actions.setStatusCode("UniqueEmail"),
                    loginSlice.actions.registerFail(err),
                ])
            );
        })
    );
const getUserInfo$: RootEpic = (action$) =>
    action$.pipe(
        filter(getUserInfoRequest.match),
        switchMap((re : any) => {
            return IdentityApi.getUserInfo(re.payload).pipe(
                mergeMap((res: any) => {
                    const token = res.data.accessToken;
                    const user = {
                        email: res.data.email,
                        fullName: res.data.fullName,
                        createdAt: res.data.createdAt,
                        updatedAt: res.data.updatedAt,
                    };
                    return [
                        loginSlice.actions.getUserInfoSuccess({
                            user,
                            token: token,
                        }),
                    ];
                }),
                catchError((err : any) => [loginSlice.actions.getUserInfoFail(err)])
            );
        })
    );

const checkActiveAccount$: RootEpic = (action$) => action$.pipe(
    filter(checkActiveAccountRequest.match),
    switchMap((re : any) => {
        return IdentityApi.checkActiveAccount(re.payload).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [
                    loginSlice.actions.checkActiveAccountSuccess(res),
                ];
            }),
            catchError((err : any) =>
                [loginSlice.actions.checkActiveAccountFailed(err)]
            )
        )
    })
)

const editProfile$: RootEpic = (action$) =>
action$.pipe(
    filter(editProfileRequest.match),
    mergeMap((re) => {
        return IdentityApi.editProfile(re.payload).pipe(
            mergeMap((res: any) => {
                return [
                    loginSlice.actions.editProfileSuccess(res.data),
                    bookSlice.actions.getProfileSuccess(res.data)
                ];
            }),
            catchError((err) => [loginSlice.actions.editProfileFail(err)])
        );
    })
);

const changePassword$: RootEpic = (action$) => action$.pipe(
    filter(changePasswordRequest.match),
    switchMap((re) => {
        return IdentityApi.changePassword(re.payload).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [
                    loginSlice.actions.changePasswordSuccess(res),
                ];
            }),
            catchError(err =>
                [loginSlice.actions.changePasswordFail(err)]
            )
        )
    })
)

const resetPassword$: RootEpic = (action$) => action$.pipe(
    filter(resetPasswordRequest.match),
    switchMap((re) => {
        return IdentityApi.resetPassword(re.payload).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [
                    loginSlice.actions.resetPasswordSuccess(res),
                ];
            }),
            catchError(err =>
                [loginSlice.actions.resetPasswordFail(err)]
            )
        )
    })
)

const forgotPassword$: RootEpic = (action$) => action$.pipe(
    filter(forgotPasswordRequest.match),
    switchMap((re) => {
        return  IdentityApi.forgotPassword(re.payload).pipe(
            mergeMap((res: any) => {
                console.log(res);
                return [
                    loginSlice.actions.forgotPasswordSuccess(res),
                ];
            }),
            catchError(err =>
                [loginSlice.actions.forgotPasswordFail(err)]
            )
        )
    })
)
export const LoginEpics = [
    login$,
    clearMessage$,
    logOut$,
    register$,
    getUserInfo$,
    checkActiveAccount$,
    editProfile$,
    changePassword$,
    forgotPassword$,
    resetPassword$,
];
export const {
    getUserInfoRequest,
    loginRequest,
    checkEmailRequest,
    forgotRequest,
    clearMessageResquest,
    clearAllRequest,
    registerRequest,
    checkAbleToLogin,
    checkActiveAccountRequest,
    changePasswordRequest,
    editProfileRequest,
    forgotPasswordRequest,
    resetPasswordRequest,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
