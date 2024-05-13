import { ISignUpForm, SignInResponse } from '@/@types/Form/auth/auth'
import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignUpResponse,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: 'auth/login',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: ISignUpForm) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/auth/register',
        method: 'post',
        data,
    })
}

export async function apiGoogleRegister(data: any) {
    return ApiService.fetchData<any>({
        url: '/auth/google-auth-register',
        method: 'post',
        data,
    })
}
export async function apiGoogleLogin(data: any) {
    return ApiService.fetchData<any>({
        url: '/auth/google-auth-login',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
