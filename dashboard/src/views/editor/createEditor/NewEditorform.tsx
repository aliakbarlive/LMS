import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import { Field, Form, Formik, FormikContext, useFormikContext } from 'formik'
import {CreateEditorUserSchema} from '@/validation'
import { LuAsterisk } from "react-icons/lu";
import { useState } from 'react'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ProfilePic from '@/components/shared/webCam/ProfilePic'
import ImageCropper from '@/components/shared/webCam/ImageCropper.tsx'
import { Upload } from '@/components/ui'
import type { FieldProps } from 'formik'
import Checkbox from '@/components/ui/Checkbox'
import GeneratePassword from '@/components/shared/CreateUser/GeneratePassword'
import { FieldInputProps, FormikProps } from 'formik';

type FormikData = {
    firstName: string
    lastName: string
    middleName:string
    email: string
    userName: string
    password: string
    profilePic:any
    userRole:Array<string | number>
}
type FormModel = {
    userRole: Array<string | number>
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

// Helper function to convert File to base64
const readFileAsBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}
interface PasswordConfig {
    length: number;
    numbers?: boolean;
    symbols?: boolean;
}
type SendDataFunction = (data: string) => void;

const NewEditorform = () => {
  const [avatarImg, setAvatarImg] = useState<string | null>(null)
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [capturedImageData, setCapturedImageData] = useState<string | null>(null);

  const onFileUpload = (files: File[], form: any) => {
    if (files && files.length > 0) {
        const uploadedFile = files[0] 
        const fileNameWithExtension = uploadedFile.name 
        setAvatarImg(fileNameWithExtension) 
        form.setFieldValue('profilePic', uploadedFile)
        readFileAsBase64(uploadedFile)
    }
}

  const handleCropComplete = (croppedImage: string,form:any) => {
    console.log("Cropped Image:", croppedImage);
    form.setFieldValue('profilePic',croppedImage)
  };

  const handleWebcamButtonClick = () => {
    setShowProfile(true);
  };

  const handleCapture = (imageData: string) => {
    setCapturedImageData(imageData);
  };

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

    const selectedCourse =null

    const createFormData = (values: FormikData) => {
        const formData = new FormData();
        formData.append('firstName', values.firstName)
        formData.append('middleName', values.middleName)
        formData.append('lastName', values.lastName)
        formData.append('email', values.email)
        formData.append('userName', values.userName)
        formData.append('password', values.password)
        values.userRole.forEach(role => {
            formData.append('userRole', String(role));
        });
        return formData
    }

    const onComplete =  (
        values: FormikData,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const formData = createFormData(values);
        console.log(values,"form values");
        setSubmitting(false);
        
        
    }


    const courseInitialValues = () => ({
        firstName: '',
        lastName: '',
        middleName:'',
        email: '',
        userName:'',
        userRole:[],
        password: generatedPassword,
    })
   
    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...(selectedCourse === 1
                    ? selectedCourse
                    : courseInitialValues()),
                profilePic:  null? null :'',
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
                            <GeneratePassword passwordConfig={passwordConfig} sendData={handlePassword}/>
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
                                    
                                                {/* <Button className='w-full sm:w-auto' type={"button"} onClick={handleWebcamButtonClick}>Web Cam</Button>
                                                {showProfile && <ProfilePic onCapture={handleCapture} />}

                                                {capturedImageData && <ImageCropper src={capturedImageData}
                                                    onCropComplete={handleCropComplete}
                                                    form={form}
                                                    cropperOptions={{ aspectRatio: 1 }}
                                                    />
                                                } */}
                                                
                                            </>
                                            )}
                                        </Field>
                                        </div>
                                </FormItem> 
                            
                                <FormItem
                                    label="User Role"
                                    invalid={Boolean(errors.userRole && touched.userRole)}
                                    extra={asterisk}
                                    errorMessage={errors.userRole as string}
                                >
                                    <Field name="userRole">
                                        {({ field, form }: FieldProps<FormModel>) => (
                                            <>
                                                <Checkbox.Group  
                                                value={values.userRole}
                                                    onChange={(options) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            options
                                                        )
                                                    }
                                                    className= 'xl:flex-row flex-col  gap-2 xl:gap-0'
                                                >
                                                    {['Admin', 'Instructor', 'Manager', 'Corporate', 'Editor', 'Student'].map(userRole => (
                                                        <Checkbox
                                                            key={userRole}
                                                            name={field.name}
                                                            value={userRole}
                                                        >
                                                            {userRole}
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

export default NewEditorform
