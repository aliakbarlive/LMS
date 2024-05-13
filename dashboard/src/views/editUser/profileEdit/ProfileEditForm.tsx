import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import { Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import { LuAsterisk } from "react-icons/lu";
import { useEffect, useState } from 'react'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import type { FieldProps } from 'formik'
import Checkbox from '@/components/ui/Checkbox'
import React from 'react'
import axios from 'axios'
import appConfig from '@/configs/app.config'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import { useNavigate, useParams } from 'react-router-dom'
import { newUser } from '@/store/slices/auth/createUser'
import { useAppDispatch } from '@/store'
import ShowToast from '@/components/ui/Notification/ShowToast'
import useQuery from '@/utils/hooks/useQuery'
import { string } from 'yup'

type FormikData = {
    firstName: string
    lastName: string
    middleName:string
    email: string
    userName: string
    password: string
    role:Array<string | number>
}
type FormModel = {
    role: Array<string | number>
}


interface CreateUserFormProps{
    userRoles:string[]
}

const optional = <span className="ml-1 opacity-60">(optional)</span>
const asterisk= <span><LuAsterisk color='red'/></span>



const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().min(3, 'First Name must be at least 3 characters').required('First Name is required'),
    middleName: Yup.string().optional(),
    role: Yup.array().min(1, 'Select at least one option!'),
    lastName: Yup.string().min(3, 'First Name must be at least 3 characters').required('Last Name is required'),
    email: Yup.string().required('Email is required').email(),
    userName: Yup.string().required('User Name is required'),
    password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('Password is required'),
})



const ProfileEditForm:React.FC<CreateUserFormProps> = ({userRoles}) => {

    const createFormData = (values: FormikData) => {
        const formData = new FormData();
        formData.append('firstName', values.firstName)
        formData.append('middleName', values.middleName)
        formData.append('lastName', values.lastName)
        formData.append('email', values.email)
        formData.append('userName', values.userName)
        formData.append('password', values.password)
        values.role.forEach(role => {
            formData.append('role', String(role));
        });
        return formData
    }

    const makeRequest = async (
        method: 'post',
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


    const onComplete =  async(
        values: FormikData,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const formData = createFormData(values);
        console.log("formData>>>>>",formData);
        try {
            const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
            const persistData = deepParseJson(rawPersistData)
            const accessToken = (persistData as any).auth.session.token
            const baseUrl = `${appConfig.baseUrl}/${appConfig.apiPrefix}`
                // const response = await makeRequest(
                //     'post',
                //     `${baseUrl}/auth/create`,
                //     formData,
                //     accessToken
                // )
                // console.log(response.msg);
                // if(response.msg === "user craeted successfully!"){
                //     toast.push(
                //         <Notification
                //             title={` user craeted successfully! `}
                //             type="success"
                //         />,
                //         {
                //             placement: 'top-center',
                //         }
                //     )
                //     setSubmitting(false);
                //     navigate('/users')
                // }
                // if(response){
                //     const { firstName, middleName, lastName, email, userName, profilePic,password, role} = response.userWithoutPassword;
                //     dispatch(newUser({
                //         firstName,
                //         middleName, 
                //         lastName, 
                //         email, 
                //         userName, 
                //         profilePic,
                //         password, 
                //         role,
                //     }))
                   
                // }

        } catch (error) {
            console.log(error)
            setSubmitting(false)
        }

    }


    const courseInitialValues = () => ({
        firstName: '',
        lastName: '',
        middleName:'',
        email: '',
        userName:'',
        role:[],
        password: '',
    })

    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...(courseInitialValues()),
            }}
            validationSchema={UpdateUserSchema}
            onSubmit={(values, { setSubmitting ,resetForm }) => {
                onComplete(values, setSubmitting)
                resetForm();
            }}
        >
            {({ values, touched, errors, isSubmitting }) => {
                return (
                    <Form>
                        <FormContainer>
                            <div className='flex gap-0 justify-between flex-col sm:flex-row sm:gap-4'>
                                <FormItem
                                    extra={asterisk}
                                    label="First Name"
                                    invalid={errors.firstName && touched.firstName}
                                    errorMessage={errors.firstName}
                                    className='w-full'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="firstName"
                                        component={Input}
                                        placeholder="Enter First Name"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Middle Name"
                                    extra={optional}
                                    className='w-full'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="middleName"
                                        component={Input}
                                        placeholder="Enter Middle Name"
                                    />
                                </FormItem>
                                <FormItem
                                    extra={asterisk}
                                    label="Last Name"
                                    invalid={errors.lastName && touched.lastName}
                                    errorMessage={errors.lastName}
                                    className='w-full'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="lastName"
                                        component={Input}
                                        placeholder="Enter Last Name"
                                    />
                                </FormItem>
                            </div>
                            <div className='flex gap-0 justify-between flex-col sm:flex-row sm:gap-4'>
                                <FormItem
                                    extra={asterisk}
                                    label="Email"
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                    className='w-full'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="email"
                                        component={Input}
                                        placeholder="Enter Email"
                                    
                                    />
                                </FormItem>
                                <FormItem
                                    extra={asterisk}
                                    label="Username"
                                    invalid={errors.userName && touched.userName}
                                    errorMessage={errors.userName}
                                    className='w-full'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="userName"
                                        component={Input}
                                        placeholder="Enter User Name"
                                    />
                                </FormItem>
                            </div>
                           <div className="flex gap-0  sm:items-center flex-col sm:flex-row sm:gap-4">
                                <FormItem
                                    label="Password"
                                    invalid={errors.password && touched.password}
                                    errorMessage={errors.password}
                                    extra={asterisk}
                                    className='sm:w-1/2'
                                    
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password"
                                        component={Input}
                                        placeholder="Enter Password"
                                    
                                    />
                                </FormItem>
                           </div>
                           <div className='flex pt-6 gap-4 flex-col sm:flex-row'>
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
                           </div>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ProfileEditForm
