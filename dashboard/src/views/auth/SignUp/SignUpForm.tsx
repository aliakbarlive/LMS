import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import { Upload } from '@/components/ui'
import TextArea from '@/components/ui/TextArea'
import SelectBox from '@/components/ui/SelectBox'

import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import { Segment, Select } from '@/components/ui'
import InputGroup from '@/components/ui/InputGroup/InputGroup'
import { countryList } from '@/constants/countries.constant'
import { skillsList } from '@/constants/skills.constant'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
// import formatCNIC from '@/utils/formatCNIC'
import { yupResolver } from '@hookform/resolvers/yup'
import { ISignUpForm } from '@/@types/Form/auth/auth'
import { apiGoogleRegister, apiSignUp } from '@/services/AuthService'
import useQuery from '@/utils/hooks/useQuery'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'
import { useNavigate } from 'react-router-dom'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { SignUpValidationSchema } from '@/validation/Form/auth/authValidationSchema'
import { HiCheckCircle } from 'react-icons/hi'
import classNames from 'classnames'
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { gapi } from 'gapi-script'
import { setUser, signInSuccess, useAppDispatch } from '@/store'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { yupToFormErrors } from 'formik'
import { SignUpResponse } from '@/@types/auth'

/*-----------------------------------------------------------*/
// Types and Interface Declaration
interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type Country = {
    label: string
    dialCode: string
    value: string
}
type Skills = {
    label: string
    value: string
}
type UserType = 'Student' | 'Instructor' | 'Organization'

const MAX_CHARS = 100

const SignUpForm = (props: SignUpFormProps) => {
    /*-----------------------------------------------------------*/
    // State Variable Declaration
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const [selectedCountryCode, setSelectedCountryCode] =
        useState<Country | null>(null)

    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    // State for user type and segment selections
    const [userType, setUserType] = useState<UserType>('Student')
    const [segmentSelections, setSegmentSelections] = useState<
        { value: UserType; disabled: boolean }[]
    >([
        { value: 'Student', disabled: false },
        { value: 'Instructor', disabled: false },
        { value: 'Organization', disabled: false },
    ])
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const handleChange = (selectedOptions: any, dataType: string) => {
        setSelectedOptions(selectedOptions)
        if (dataType === 'skills') {
            setValue(
                'userTypeData.skills',
                selectedOptions.map((option: any) => option.value)
            )
        } else {
            setValue(
                'userTypeData.expertise',
                selectedOptions.map((option: any) => option.value)
            )
        }
    }

 
    

    const [remainingChars, setRemainingChars] = useState(MAX_CHARS)

    /*--------------------------------------------------------------------------------*/
    // *****************
    // Hook Declaration
    const resolver = async (values: ISignUpForm) => {
        try {
            await SignUpValidationSchema.validate(values, { abortEarly: false })
            return {
                values: values,
                errors: {},
            }
        } catch (errors) {
            return {
                values: {},
                errors: yupToFormErrors(errors),
            }
        }
    }
    const {
        register,
        setError,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ISignUpForm>({
        resolver: resolver,
    })
    const [message, setMessage] = useTimeOutMessage()
    const query = useQuery()
    const navigate = useNavigate()
    // Function to update the selected user type value
    // const handleUserTypeChange = (newValue: string) => {
    //     console.log(newValue)
    // }
    // Function to update the selected user type value
    const handleUserTypeChange = (newValue: UserType) => {
        setUserType(newValue)
    }

    // *****************
    /*--------------------------------------------------------------------------------*/

    const formatOptionLabel = ({ value, dialCode }: Country) => (
        <div>
            <span>({dialCode})</span>
        </div>
    )

    const handleCountryChange = (selected: Country | null) => {
        setSelectedCountryCode(selected)
        setValue('countryCode', selected?.dialCode || '')
    }

    const formatOptionLabelForSkill = ({ label, value }: Skills) => (
        <div>
            <span>{value}</span>
        </div>
    )
    const onFileUpload = (files: File[], form: any) => {
        if (files && files.length > 0) {
            const uploadedFile = files[0]
            const fileNameWithExtension = uploadedFile.name
            console.log(fileNameWithExtension, 'fileNameWithExtension')
        }
    }

    // const segmentSelections = [
    //     { value: 'Student', disabled: false },
    //     { value: 'Instructor', disabled: false },
    //     { value: 'Organization', disabled: false },
    // ]

    // User SignUp By their Email
    const onFormSubmit: SubmitHandler<ISignUpForm> = async (data) => {
        data.user_type = userType
        setLoading(true)
        apiSignUp(data)
            .then((res: any) => {
                if (res.data.status) {
                    ShowToast('success', 'Success Fully Sign in')
                    navigate('/sign-in')
                }
            })
            .catch((error) => {
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
                } else if (error.response && error.response.status == 409) {
                    ShowToast('warning', 'Email Already Registered')
                    setMessage('Email Already Register')
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (response: any) => {
            setLoading(true)
            apiGoogleRegister({ access_token: response.access_token })
                .then((res) => {
                    setLoading(false)
                    ShowToast('success', 'Success fully Registered')
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
                    } = res.data.user
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
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)

                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.errors
                    ) {
                        ShowToast('danger', 'Some Field required')
                        // Set the server-side validation errors in the form state
                        const serverErrors = error.response.data.errors
                        for (const field in serverErrors) {
                            setError(field as any, {
                                message: serverErrors[field],
                            })
                        }
                    } else if (
                        error.response &&
                        error.response.status === 409
                    ) {
                        ShowToast('warning', 'Email Already Registered')
                        setMessage('Email Already Register')
                    } else {
                        setMessage('something Wrong')
                    }
                })
        },
    })

    return (
        <div className={className}>
            {/* <ToastContainer/> */}
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Segment
                    defaultValue={['Student']}
                    className="gap-2 md:flex-row flex-col pb-4"
                >
                    {segmentSelections.map((item) => (
                        <Segment.Item
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {({
                                active,
                                value,
                                onSegmentItemClick,
                                disabled,
                            }) => {
                                return (
                                    <div
                                        className={classNames(
                                            'flex',
                                            'ring-1',
                                            'justify-between',
                                            'border',
                                            'rounded-md ',
                                            'border-gray-300',
                                            'py-4 px-2',
                                            'cursor-pointer',
                                            'select-none',
                                            'w-100',
                                            'md:w-[180px]',
                                            active
                                                ? 'ring-cyan-500 border-cyan-500'
                                                : 'ring-transparent',
                                            disabled
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:ring-cyan-500 hover:border-cyan-500'
                                        )}
                                        onClick={() => {
                                            onSegmentItemClick()
                                            handleUserTypeChange(item.value)
                                        }}
                                    >
                                        <div>
                                            <h6>{value}</h6>
                                        </div>
                                        {active && (
                                            <HiCheckCircle className="text-cyan-500 text-xl" />
                                        )}
                                    </div>
                                )
                            }}
                        </Segment.Item>
                    ))}
                </Segment>

                <div>
                    <div className="mb-4">
                        <>
                            <label className="form-label mb-2">
                                Full Name:
                            </label>
                            <Input
                                {...register('name')}
                                invalid={!!errors.name}
                                placeholder="Enter Your Full Name"
                                type="text"
                            />
                            <p className="text-red-600">
                                {errors.name?.message?.toString()}
                            </p>
                        </>
                    </div>

                    {userType === 'Instructor' && (
                        <>
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Profile Pic
                                </label>
                                <Upload
                                    draggable
                                    showList
                                    onChange={(files, form) =>
                                        onFileUpload(files, form)
                                    }
                                >
                                    <div className="my-2 text-center">
                                        <div className="text-4xl mb-4 flex justify-center">
                                            <FaUserCircle />
                                        </div>
                                        <p className="font-semibold">
                                            <span className="text-gray-800 dark:text-white">
                                                Drop your Profile Pic here, or{' '}
                                            </span>
                                            <span className="text-blue-500">
                                                browse
                                            </span>
                                        </p>
                                        <p className="mt-1 opacity-60 dark:text-white">
                                            Support: jpeg, png
                                        </p>
                                    </div>
                                </Upload>
                                <p className="text-red-600">
                                    {/* {(errors.userTypeData && (errors.userTypeData as any).expertise?.message)} */}
                                </p>
                            </div>
                        </>
                    )}

                    <div className="mb-4">
                        <label className="form-label mb-2">Phone #:</label>
                        <InputGroup>
                            <Select
                                isSearchable
                                {...register('countryCode')}
                                className="w-48"
                                options={countryList}
                                value={selectedCountryCode}
                                formatOptionLabel={formatOptionLabel}
                                onChange={handleCountryChange}
                            />
                            <Input
                                {...register('phone')}
                                placeholder="Enter Your Phone"
                            />
                        </InputGroup>

                        <p className="text-red-600">
                            {errors.phone?.message?.toString()}
                        </p>
                    </div>

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
                    <div className="mb-4">
                        <label className="form-label mb-2">
                            Confirm Password:
                        </label>
                        <Input
                            {...register('confirmPassword')}
                            invalid={!!errors.confirmPassword}
                            placeholder="Enter Your Password Again"
                            type="password"
                        />
                        <p className="text-red-600">
                            {errors.confirmPassword?.message?.toString()}
                        </p>
                    </div>
                    {userType === 'Instructor' && (
                        <>
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Skill Set:
                                </label>
                                <SelectBox
                                    {...register('userTypeData.skills')}
                                    isMulti
                                    options={skillsList}
                                    size="sm"
                                    value={selectedOptions}
                                    onChange={handleChange}
                                    datatype="skills"
                                />
                                <p className="text-red-600">
                                    {errors.userTypeData &&
                                        (errors.userTypeData as any).skills
                                            ?.message}
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Experience:
                                </label>
                                <Input
                                    {...register('userTypeData.experience')}
                                    invalid={
                                        !!(
                                            errors.userTypeData &&
                                            (errors.userTypeData as any)
                                                .experience
                                        )
                                    }
                                    placeholder="Enter Experience"
                                    type="text"
                                    maxLength={MAX_CHARS}
                                    onChange={(e) => {
                                        const remaining =
                                            MAX_CHARS - e.target.value.length
                                        setRemainingChars(
                                            remaining > 0 ? remaining : 0
                                        )
                                    }}
                                />
                                <p className="text-red-600">
                                    {errors.userTypeData &&
                                        (errors.userTypeData as any).experience
                                            ?.message}
                                </p>
                                <p className="text-gray-500">
                                    Remaining characters: {remainingChars}
                                </p>
                            </div>
                        </>
                    )}

                    {userType === 'Organization' && (
                        <>
                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Organization Expertise:
                                </label>
                                <SelectBox
                                    {...register('userTypeData.expertise')}
                                    isMulti
                                    options={skillsList}
                                    size="sm"
                                    value={selectedOptions}
                                    datatype="expertise"
                                    onChange={handleChange}
                                />
                                <p className="text-red-600">
                                    {errors.userTypeData &&
                                        (errors.userTypeData as any).expertise
                                            ?.message}
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="form-label mb-2">
                                    Organization Background:
                                </label>
                                <TextArea
                                    {...register('userTypeData.orgBackground')}
                                    invalid={
                                        !!(
                                            errors.userTypeData &&
                                            (errors.userTypeData as any)
                                                .orgBackground
                                        )
                                    }
                                    placeholder="Enter Organization Background"
                                    type="text"
                                />
                                <p className="text-red-600">
                                    {errors.userTypeData &&
                                        (errors.userTypeData as any)
                                            .orgBackground?.message}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <div></div>
                <Button block loading={loading} variant="solid" type="submit">
                    Create Account
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
                        // onClick={() => googleLogin()}
                    >
                        <span>
                            <span>Apple Login</span>
                        </span>
                    </Button>
                </div> */}

                <div className="mt-4 text-center mb-6">
                    <span>Already have an account? </span>
                    <ActionLink to={signInUrl}>Sign in</ActionLink>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
