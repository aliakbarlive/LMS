import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { SignInCredential } from '@/@types/Form/auth/auth'
import { apiGoogleLogin, apiSignIn } from '@/services/AuthService'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { yupResolver } from '@hookform/resolvers/yup'
import { setUser, signInSuccess, useAppDispatch } from '@/store'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'
import { useNavigate } from 'react-router-dom'
import useQuery from '@/utils/hooks/useQuery'
import { SignInValidationSchema } from '@/validation/Form/auth/authValidationSchema'
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'
import { gapi } from 'gapi-script'
import { useGoogleLogin } from '@react-oauth/google'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

const SignInForm = (props: SignInFormProps) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props
    /*-----------------------------------------------------------*/
    // State Variable Declaration
    const [loading, setLoading] = useState(false)

    /*--------------------------------------------------------------------------------*/
    // *****************
    // Hook Declaration
    const [message, setMessage] = useTimeOutMessage()
    const { signIn } = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const {
        register,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInCredential>({
        resolver: yupResolver(SignInValidationSchema),
    })

    const onFormSubmit: SubmitHandler<any> = (data) => {
        setLoading(true)
        apiSignIn(data)
            .then((resp: any) => {
                const {
                    token,
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
                // Dispatch Sing In Success with Token
                dispatch(signInSuccess(token))
                // Dispatch User Data To setUser
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

                ShowToast('success', 'Success Fully Sign in')
            })
            .catch((error) => {
                console.log('Error', error)

                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    // Set the server-side validation errors in the form state
                    const serverErrors = error.response.data.errors
                    for (const field in serverErrors) {
                        setError(field as any, {
                            message: serverErrors[field],
                        })
                    }
                } else if (error.response && error.response.status == 403) {
                    ShowToast('warning', 'Invalid Email or Password')
                    setMessage('Invalid Email or Password')
                } else {
                    setMessage('something Wrong')
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // const googleLogin = useGoogleLogin({
    //     onSuccess: async (response: any) => {
    //         setLoading(true)
    //         apiGoogleLogin({ access_token: response.access_token })
    //             .then((res) => {
    //                 setLoading(false)
    //                 ShowToast('success', 'Success fully Registered')
    //                 const { token, name, role, _id, email } = res.data.user
    //                 // Dispatch Sing In Success with Token
    //                 dispatch(signInSuccess(token))
    //                 // Dispatch User Data To setUser
    //                 dispatch(
    //                     setUser({
    //                         name: name,
    //                         email: email,
    //                         _id: _id,
    //                         role,
    //                     })
    //                 )
    //             })
    //             .catch((error) => {
    //                 setLoading(false)

    //                 if (
    //                     error.response &&
    //                     error.response.data &&
    //                     error.response.data.errors
    //                 ) {
    //                     ShowToast('danger', 'Some Field required')
    //                     // Set the server-side validation errors in the form state
    //                     const serverErrors = error.response.data.errors
    //                     for (const field in serverErrors) {
    //                         setError(field as any, {
    //                             message: serverErrors[field],
    //                         })
    //                     }
    //                 } else if (
    //                     error.response &&
    //                     error.response.status === 403
    //                 ) {
    //                     ShowToast('warning', 'Please register first.')
    //                     setMessage('Please register first.')
    //                 } else {
    //                     setMessage('something Wrong')
    //                 }
    //             })
    //     },
    // })

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <>{message}</>
                </Alert>
            )}
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div>
                    <div className="mb-4">
                        <label className="form-label mb-2">Email:</label>
                        <Input
                            {...register('email')}
                            invalid={!!errors.email}
                            placeholder="e.g example@domain.com"
                            type="email"
                        />
                        <p className="text-red-600">
                            {errors.email?.message?.toString()}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-2">Password:</label>
                        <Input
                            {...register('password')}
                            invalid={!!errors.password}
                            placeholder="Enter Your Password"
                            type="password"
                        />
                        <p className="text-red-600">
                            {errors.password?.message?.toString()}
                        </p>
                    </div>
                    <div className="flex justify-between mb-6">
                        <Checkbox className="mb-0" name="rememberMe">
                            Remember Me
                        </Checkbox>

                        <ActionLink to={forgotPasswordUrl}>
                            Forgot Password?
                        </ActionLink>
                    </div>
                </div>
                <Button block loading={loading} variant="solid" type="submit">
                    Sign in
                </Button>
                {/* <div className="flex justify-around mt-4 gap-x-4">
                    <Button
                        block
                        variant="twoTone"
                        icon={<FcGoogle />}
                        onClick={() => googleLogin()}
                    >
                        <span>
                            <span>Google Login</span>
                        </span>
                    </Button>
                    <Button
                        block
                        variant="twoTone"
                        color="violet"
                        icon={<BsApple />}
                    >
                        <span>
                            <span>Apple Login</span>
                        </span>
                    </Button>
                </div> */}
                <div className="mt-4 text-center">
                    <span>{`Don't have an account yet?`} </span>
                    <ActionLink to={signUpUrl}>Sign up</ActionLink>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
