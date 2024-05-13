import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import { Field, Form, Formik} from 'formik'
import {CreateEditorUserSchema} from '@/validation'
import { LuAsterisk } from "react-icons/lu";
import { useEffect, useState } from 'react'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { Upload } from '@/components/ui'
import type { FieldProps } from 'formik'
import Checkbox from '@/components/ui/Checkbox'
import GeneratePassword from './GeneratePassword'
import React from 'react'
import axios from 'axios'
import appConfig from '@/configs/app.config'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import { useNavigate, useParams } from 'react-router-dom'
import { newCreatedUser } from '@/store/slices/auth/createUser'
// import { useAppDispatch } from '@/store'
import ShowToast from '@/components/ui/Notification/ShowToast'
import useQuery from '@/utils/hooks/useQuery'
import { string } from 'yup'
import { useDispatch } from 'react-redux'
// import { }

type FormikData = {
    firstName: string
    lastName: string
    middleName:string
    email: string
    userName: string
    password: string
    profilePic:any
    role:Array<string | number>
}
type FormModel = {
    role: Array<string | number>
}
interface PasswordConfig {
    length: number;
    numbers?: boolean;
    symbols?: boolean;
}

type SendDataFunction = (data: string) => void;

interface CreateUserFormProps{
    userRoles:string[]
}

const optional = <span className="ml-1 opacity-60">(optional)</span>
const asterisk= <span><LuAsterisk color='red'/></span>

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

type editUserType = {
    firstName: string
    lastName: string
    middleName:string
    email: string
    userName: string
    password: string
    profilePic:any
    role:Array<string | number>
}


const CreateUserForm:React.FC<CreateUserFormProps> = ({userRoles}) => {
  const [avatarImg, setAvatarImg] = useState<string | null>(null)
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [editUserData,setEditUserData]=useState<editUserType>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const query = useQuery()

  const getSingleUserDataRequest = async (
    method: 'get',
    url: string,
    accessToken: string
) => {
    try {
        const response = await axios({
            method,
            url,
            headers: {
                Authorization: `${accessToken}`,
            },
        })
        // console.log(response,"this is responce")
        return response.data
    } catch (error) {
        console.log(error)
    }
}


  const fetchuserIdParam = async ()=> {
    const userIdParam = query.get('userId');
    if (userIdParam) {
    //    console.log(userIdParam ,"userIdParam")
    }
    try {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
            const persistData = deepParseJson(rawPersistData)
            const accessToken = (persistData as any).auth.session.token
            const baseUrl = `${appConfig.baseUrl}/${appConfig.apiPrefix}`
                // const response = await getSingleUserDataRequest(
                //     'get',
                //     `${baseUrl}/users`,
                //     accessToken
                // )
    } catch (error) {
        
    }
 }

  useEffect(()=>{
    fetchuserIdParam();
  },[])



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


  const handleCopy = async (textToCopy:string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.push(
        <Notification
            title="Password copied to your clipboard."
            type="success"
        />,
        {
            placement: 'top-end',
        }
    )

    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

    const passwordConfig:PasswordConfig = {
        length: 20,
        numbers: true,
        symbols: true,
    };
    

    const handlePassword : SendDataFunction = (data)=>{
        setGeneratedPassword(data);  
        handleCopy(data);
    }

    

    const createFormData = (values: FormikData) => {
        const formData = new FormData();
        formData.append('firstName', values.firstName)
        formData.append('middleName', values.middleName)
        formData.append('lastName', values.lastName)
        formData.append('email', values.email)
        formData.append('userName', values.userName)
        formData.append('password', values.password)
        formData.append('profilePic', values.profilePic)
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
        // console.log("formData>>>>>",formData);
        try {
            const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
            const persistData = deepParseJson(rawPersistData)
            const accessToken = (persistData as any).auth.session.token
            const baseUrl = `${appConfig.baseUrl}/${appConfig.apiPrefix}`
                const response = await makeRequest(
                    'post',
                    `${baseUrl}/auth/create`,
                    formData,
                    accessToken
                )
                // console.log(response.msg);
                // console.log("the new user created", response.user)
                if(response.msg === "user craeted successfully!"){
                    toast.push(
                        <Notification
                            title={` user created successfully! `}
                            type="success"
                        />,
                        {
                            placement: 'top-center',
                        }
                    )
                    setSubmitting(false);
                    navigate('/users')
                }
                if(response){
                    const { firstName, middleName, lastName, email, userName, profilePic,password, role} = response.user;
                    dispatch(newCreatedUser({
                        firstName,
                        middleName, 
                        lastName, 
                        email, 
                        userName, 
                        profilePic,
                        password, 
                        role,
                    }))
                   
                }

        } catch (error) {
            console.log(error)
            setSubmitting(false)
        }

    }


    const courseInitialValues = () => ({
        firstName: '',
        lastName: '',
        // middleName:'',
        email: '',
        userName:'',
        role:[],
        password: generatedPassword,
    })

    const editUserInitialValues = () =>({
            firstName:  '',
            lastName: '',
            // middleName:'',
            email:'',
            userName:'',
            role:[],
            password:''
        }
    )

    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...(editUserData
                    ? editUserInitialValues()
                    : courseInitialValues()),
                profilePic: null? null :'',
            }}

            validationSchema={CreateEditorUserSchema}
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
                            {/* <FormItem
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
                            </FormItem> */}
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
                            {/* <GeneratePassword passwordConfig={passwordConfig} sendData={handlePassword}/> */}
                           </div>
                           <div className='flex pt-6 gap-4 flex-col sm:flex-row'>
                                <FormItem
                                    label="Profile Picture"
                                    invalid={
                                        errors.profilePic && touched.profilePic
                                    }
                                    errorMessage={errors.profilePic}
                                    className='sm:w-1/2'
                                    >
                                        <div className="gap-2  items-center sm:gap-10 ">
                                        <Field name="profilePic" >
                                            {({ field, form }: FieldProps) => (<>
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
                                                        onFileUpload(files, form)
                                                    } 
                                                
                                                >
                                                    <div className="text-center">
                                                        <p className="font-semibold">
                                                            <span className="text-gray-800 dark:text-white">
                                                                Drop your image
                                                                here, or{' '}
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
                                            </>
                                            )}
                                        </Field>
                                        </div>
                                </FormItem> 
                            
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

export default CreateUserForm
