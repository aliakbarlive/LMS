import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp: any = await apiSignIn(values)
            if (resp.data) {
                const { token } = resp.data.user
                dispatch(signInSuccess(token))
                if (resp.data.user) {
                    const {
                        email,
                        firstName,
                        lastName,
                        profilePic,
                        userName,
                        _id,
                        role,
                        is_verified,
                        createdAt,
                        updatedAt,
                    } = resp.data.user
                    dispatch(
                        setUser({
                            email,
                            firstName,
                            lastName,
                            profilePic,
                            userName,
                            _id,
                            role,
                            is_verified,
                            createdAt,
                            updatedAt,
                        })
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp: any = await apiSignUp(values)
            if (resp.data) {
                const {
                    email,
                    firstName,
                    lastName,
                    profilePic,
                    userName,
                    _id,
                    role,
                    is_verified,
                    createdAt,
                    updatedAt,
                } = resp.data.user
                dispatch(signInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser({
                            email,
                            firstName,
                            lastName,
                            profilePic,
                            userName,
                            _id,
                            role,
                            is_verified,
                            createdAt,
                            updatedAt,
                        })
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                email: '',
                firstName: '',
                lastName: '',
                profilePic: '',
                userName: '',
                _id: '',
                role: '',
                createdAt: '',
                is_verified: false,
                updatedAt: ''
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
