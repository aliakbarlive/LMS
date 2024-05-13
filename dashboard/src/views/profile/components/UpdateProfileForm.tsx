import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import { UpdateUserProfileSchema } from '@/validation'
import { LuAsterisk } from 'react-icons/lu'
import { useState } from 'react'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { Upload } from '@/components/ui'
import type { FieldProps } from 'formik'
import Checkbox from '@/components/ui/Checkbox'
import React from 'react'
import axios from 'axios'
import appConfig from '@/configs/app.config'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import Avatar from '@/components/ui/Avatar'
import { useNavigate, useLocation } from 'react-router-dom'

    

type FormikData = {
    firstName: string
    lastName: string
    middleName: string
    email: string
    userName: string
    newPassword: string
    confirmPassword: string
    profilePic: any
}

interface UpdateProfileForm {}
type FormModel = {
    role: Array<string | number>
}

const userRoles = ['Admin', 'Manager', 'Corporate', 'Editor','Instructor', 'Student'];

const optional = (
    <span className="ml-1 opacity-60 sm:text-sm text-xs">(optional)</span>
)
const optionalPassword = (
    <span className="ml-1 opacity-60 sm:text-sm text-xs">
        (Leave blank if you don't want to change it)
    </span>
)
const asterisk = (
    <span>
        <LuAsterisk color="red" />
    </span>
)

const beforeCoverImageUpload = (files: FileList | null, fileList: File[]) => {
    let valid: string | boolean = true
    const maxUpload = 1

    const allowedFileType = ['image/jpeg', 'image/png', 'image/webp']
    const maxFileSize = 5000000
    if (fileList.length >= maxUpload) {
        return `You can only upload ${maxUpload} file(s)`
    }

    if (files) {
        for (const f of files) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg,.png or .webp file!'
            }

            if (f.size >= maxFileSize) {
                valid = 'Upload image cannot more then 5MB!'
            }
        }
    }

    return valid
}

const readFileAsBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

const UpdateProfileForm: React.FC<UpdateProfileForm> = () => {
    const [avatarImg, setAvatarImg] = useState<string | null>(null)
    const navigate = useNavigate();
    const location = useLocation()
    const user = location.state;
    const userId = user._id
    // console.log(user);

    // edit user Form config
    const selectedUser = null

    const onFileUpload = (files: File[], form: any) => {
        if (files && files.length > 0) {
            const uploadedFile = files[0]
            const fileNameWithExtension = uploadedFile.name
            setAvatarImg(fileNameWithExtension)
            form.setFieldValue('profilePic', uploadedFile)
            readFileAsBase64(uploadedFile)
        }
    }

    const createFormData = (values: FormikData) => {
        const formData = new FormData()
        formData.append('firstName', values.firstName)
        // formData.append('middleName', values.middleName)
        formData.append('lastName', values.lastName)
        // formData.append('email', values.email)
        formData.append('userName', values.userName)
        values.role.forEach(role => {
            formData.append('role', String(role));
        });
        // formData.append('newPassword', values.newPassword)
        // formData.append('confirmPassword', values.confirmPassword)
        return formData
    }

    const makeRequest = async (
        method: 'patch',
        url: string,
        formData: FormData,
        accessToken: string
    ) => {
        try {
            const response = await axios({
                method,
                url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${accessToken}`,
                },
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const onComplete = async (
        values: FormikData,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const formData = createFormData(values)
        console.log(values, 'form values')
        try {
            const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
            const persistData = deepParseJson(rawPersistData)
            const accessToken = (persistData as any).auth.session.token
            const baseUrl = `${appConfig.baseUrl}/${appConfig.apiPrefix}`
            const response = await makeRequest(
                'patch',
                `${baseUrl}/auth/update/${userId}`,
                formData,
                accessToken
            )
            console.log(response.msg);
            if(response.status){
                toast.push(
                    <Notification
                        title={` user updated successfully! `}
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
                setSubmitting(false);
                navigate('/users')
            }
        } catch (error) {
            toast.push(
                <Notification
                    title="Unable to update user data"
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
            console.log(error)
            setSubmitting(false)
        }
    }

    const courseInitialValues = () => ({
        firstName: user.firstName,
        lastName: user.lastName,
        role:[user.role],
        // middleName: '',
        // email: '',
        userName: user.userName,
       
    })

    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...(selectedUser === 1 ? selectedUser : courseInitialValues()),
                profilePic: '',
            }}
            validationSchema={UpdateUserProfileSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onComplete(values, setSubmitting)
                resetForm()
            }}
        >
            {({ values, touched, errors, isSubmitting }) => {
                return (
                    <Form>
                        <FormContainer>
                        <div className="flex pt-6 gap-4 flex-col sm:flex-row">
                                <FormItem
                                    label="Profile Picture"
                                    invalid={
                                        errors.profilePic && touched.profilePic
                                    }
                                    errorMessage={errors.profilePic}
                                    className="w-full"
                                >
                                    <div className="flex gap-4">
                                        <Field name="profilePic">
                                            {({ field, form }: FieldProps) => (
                                                <>
                                                    <Upload
                                                        draggable
                                                        beforeUpload={
                                                            beforeCoverImageUpload
                                                        }
                                                        fileList={
                                                            field.value
                                                                ? [field.value]
                                                                : []
                                                        }
                                                        showList
                                                        onChange={(files) =>
                                                            onFileUpload(
                                                                files,
                                                                form
                                                            )
                                                        }
                                                        className="w-1/2"
                                                    >
                                                        <div className="text-center">
                                                            <p className="font-semibold">
                                                                <span className="text-gray-800 dark:text-white">
                                                                    Drop your
                                                                    image here,
                                                                    or{' '}
                                                                </span>
                                                                <span className="text-blue-500">
                                                                    browse
                                                                </span>
                                                            </p>
                                                            <p className="mt-1 opacity-60 dark:text-white">
                                                                Support: jpeg,
                                                                png
                                                            </p>
                                                        </div>
                                                    </Upload>
                                                </>
                                            )}
                                        </Field>
                                        {/* <Avatar
                                            shape="round"
                                            size={150}
                                            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                                        /> */}
                                    </div>
                                </FormItem>
                            </div>
                            <div className="flex gap-0 justify-between flex-col sm:flex-row sm:gap-4">
                                <FormItem
                                    extra={asterisk}
                                    label="First Name"
                                    invalid={
                                        errors.firstName && touched.firstName
                                    }
                                    errorMessage={errors.firstName}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="firstName"
                                        component={Input}
                                        // value={user.userName}
                                    />
                                </FormItem>
                                {/* <FormItem
                                    label="Middle Name"
                                    extra={optional}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="middleName"
                                        component={Input}
                                        placeholder="Enter Middle Name"
                                    />
                                </FormItem> */}
                                <FormItem
                                    extra={asterisk}
                                    label="Last Name"
                                    invalid={
                                        errors.lastName && touched.lastName
                                    }
                                    errorMessage={errors.lastName}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="lastName"
                                        component={Input}
                                        placeholder={user.lastName}
                                    />
                                </FormItem>
                            </div>
                            <div className="flex gap-0 justify-between flex-col sm:flex-row sm:gap-4">
                                {/* <FormItem
                                    extra={asterisk}
                                    label="Email"
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="email"
                                        component={Input}
                                        placeholder={user.email}
                                    />
                                </FormItem> */}
                                <FormItem
                                    extra={asterisk}
                                    label="Username"
                                    invalid={
                                        errors.userName && touched.userName
                                    }
                                    errorMessage={errors.userName}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="userName"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            <FormItem
                                    label="User Role"
                                    invalid={Boolean(errors.role && touched.role)}
                                    extra={asterisk}
                                    errorMessage={errors.role as string}
                                >
                                    <Field name="role">
                                        {({ field, form }: FieldProps<FormModel>) => (
                                            <>
                                                <Checkbox.Group  
                                                value={values.role}
                                                    onChange={(options) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            options
                                                        )
                                                    }
                                                    className= 'xl:flex-row flex-col  gap-2 xl:gap-0'
                                                >
                                                    {userRoles.map(role => (
                                                        <Checkbox
                                                            key={role}
                                                            name={field.name}
                                                            value={role}
                                                        >
                                                            {role}
                                                        </Checkbox>
                                                    ))}
                                                </Checkbox.Group>
                                            </>
                                        )}
                                    </Field>
                                </FormItem>


                            {/* <div className="flex gap-0  sm:items-center flex-col sm:flex-row sm:gap-4">
                                <FormItem
                                    label="New Password"
                                    invalid={
                                        errors.newPassword &&
                                        touched.newPassword
                                    }
                                    errorMessage={errors.newPassword}
                                    className="sm:w-1/2"
                                    extra={optionalPassword}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="newPassword"
                                        component={Input}
                                        placeholder="Enter New Password"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Confirm Password"
                                    invalid={
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                    }
                                    errorMessage={errors.confirmPassword}
                                    className="sm:w-1/2"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="confirmPassword"
                                        component={Input}
                                        placeholder="Enter Confirm Password"
                                    />
                                </FormItem>
                            </div> */}
                            

                            <div className="mt-4 flex sm:justify-end justify-center">
                                <Button
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                >
                                    Update
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default UpdateProfileForm