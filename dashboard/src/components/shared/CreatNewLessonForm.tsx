import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { asterisk } from '@/constants/asterisk'
import { useState } from 'react'
import axios from 'axios'
import appConfig from '@/configs/app.config'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import type { FieldProps } from 'formik'
import TextArea from '@/components/ui/TextArea'
import { Upload } from '@/components/ui'
import ShowToast from '../ui/Notification/ShowToast'

import Checkbox from '@/components/ui/Checkbox'

const CreateNewModuleSchema = Yup.object().shape({
    lessonName: Yup.string()
        .min(5, 'Lesson Name must be at least 5 characters')
        .required('Lesson Name is required'),
    description: Yup.string()
        .min(20, 'Description must be at least 20 characters')
        .required('Description is required'),
    duration: Yup.number().required('Duration required'),
    contentFiles: Yup.string().required('required'),
})

type FormikData = {
    lessonName: string
    description: string
    duration: number
    contentFiles: any
    lessonConditions:Array<string | number>
}
type FormModel = {
    lessonConditions: Array<string | number>
}
type editModuleType = {
    lessonName: string
    description: string
    duration: number
    contentFiles: any
}
const beforeContentFileUpload = (files: FileList | null, fileList: File[]) => {

    console.log(files)

    let valid: string | boolean = true
    const maxUpload = 5

    const allowedFileTypes = [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]


    const maxFileSize = 5 * 1024 * 1024

    if (fileList.length >= maxUpload) {
        return `You can only upload ${maxUpload} file(s)`
    }

    if (files) {
        for (const f of files) {
        
            if (!allowedFileTypes.includes(f.type)) {
                valid = 'Please upload a PDF, PPT, or Word document!'
            }

            if (f.size >= maxFileSize) {
                valid = 'Upload file cannot exceed 5MB!'
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
const CreatNewLessonForm = () => {
    const [editModuleData, setEditModuleData] = useState<editModuleType>()

    const option = [
        { value: 'lesson 1', label: 'lesson 1' },
        { value: 'lesson 2', label: 'lesson 2' },
        { value: 'lesson 3', label: 'lesson 3' },
        { value: 'lesson 4', label: 'lesson 4' },
    ]


    const lessonConditions =[
        'Viewable by Enrolled Learners of course session (Normally this should be checked .if unchecked then only instrutor can access the lesson)',
        'Previewable - Viewable without course session enrollment',
        'Graded in course sessions gradebook',
        'Mandatory to read this lesson to proceed (Require lesson to be fully viewed all pages or lenght of  video/audio)',
        'Downloadable',
        'Show table of contents from lesson',
    ]

    const createFormData = (values: FormikData) => {
        const formData = new FormData()
        formData.append('lessonName', values.lessonName)
        formData.append('description', values.lessonName)
        formData.append('duration', String(values.duration))
        values.lessonConditions.forEach(lessonConditions => {
            formData.append('lessonConditions', String(lessonConditions));
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

    const onComplete = async (
        values: FormikData,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)

        values ? ShowToast('success','completed') : ShowToast("danger",'error');

        const moduleData = createFormData(values)

        console.log('moduleData', values)
        try {
            const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
            const persistData = deepParseJson(rawPersistData)
            const accessToken = (persistData as any).auth.session.token
            const baseUrl = `${appConfig.baseUrl}/${appConfig.apiPrefix}`
        } catch (error) {
            console.log(error)
            setSubmitting(false)
        }
    }

    const moduleInitialValues = () => ({
        lessonName: '',
        description: '',
        duration: 0,
        contentFiles: '',
         lessonConditions:[],
    })

    const editModuleInitialValues = () => ({
        lessonName: '',
        description: '',
        duration: 0,
        contentFiles: '',
         lessonConditions:[],
    })

    const onFileUpload = (files: File[], form: any) => {

        

        if (files && files.length > 0) {
            files.forEach((file)=>{
                form.setFieldValue('contentFiles', file)
                readFileAsBase64(file)
            })    
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...(editModuleData
                    ? editModuleInitialValues()
                    : moduleInitialValues()),
            }}
            validationSchema={CreateNewModuleSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onComplete(values, setSubmitting)
                resetForm()
            }}
        >
            {({ values, touched, errors, isSubmitting }) => {
                return (
                    <Form className="p-4 h-full ">
                        <FormContainer className="h-full flex flex-col justify-between">
                            <div className="">
                                <FormItem
                                    extra={asterisk}
                                    label="Lesson name"
                                    invalid={
                                        errors.lessonName && touched.lessonName
                                    }
                                    errorMessage={errors.lessonName}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="lessonName"
                                        component={Input}
                                        placeholder="Enter Lesson Name"
                                    />
                                </FormItem>
                                <FormItem
                                    extra={asterisk}
                                    label="Description"
                                    invalid={
                                        errors.description &&
                                        touched.description
                                    }
                                    errorMessage={errors.description}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="description"
                                        component={TextArea}
                                        placeholder="Write Description"
                                    />
                                </FormItem>
                                <FormItem
                                    extra={asterisk}
                                    label="Lesson duration in minutes"
                                    invalid={
                                        errors.duration && touched.duration
                                    }
                                    errorMessage={errors.duration}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="duration"
                                        component={Input}
                                        placeholder="Enter Lesson Duration in minutes"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Upload files"
                                    invalid={
                                        errors.contentFiles &&
                                        touched.contentFiles
                                    }
                                    errorMessage={errors.contentFiles}
                                >
                                    <Field name="contentFiles">
                                        {({ field, form }: FieldProps) => (
                                            <Upload
                                                draggable
                                                beforeUpload={
                                                    beforeContentFileUpload
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
                                                <div className="my-2 text-center">
                                                    <div className="text-6xl mb-4 flex justify-center"></div>
                                                    <p className="font-semibold">
                                                        <span className="text-gray-800 dark:text-white">
                                                            Drop your files
                                                            here, or{' '}
                                                        </span>
                                                        <span className="text-blue-500">
                                                            browse
                                                        </span>
                                                    </p>
                                                    <p className="mt-1 opacity-60 dark:text-white">
                                                        Support: PDF, PPT, Word
                                                    </p>
                                                </div>
                                            </Upload>
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="Lesson Condtions"
                                    invalid={Boolean(errors.lessonConditions && touched.lessonConditions)}
                                    extra={asterisk}
                                    errorMessage={errors.lessonConditions as string}
                                >
                                    <Field name="lessonConditions">
                                        {({ field, form }: FieldProps<FormModel>) => (
                                            <>
                                                <Checkbox.Group  
                                                value={values.lessonConditions}
                                                vertical
                                                    onChange={(options) =>
                                                        form.setFieldValue(
                                                            'lessonConditions',
                                                            options
                                                        )
                                                    }
                                                >
                                                    {lessonConditions.map(condition => (
                                                        <Checkbox
                                                            key={condition}
                                                            name={field.name}
                                                            value={condition}
                                                            className='text-base'
                                                        >
                                                            {condition}
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

export default CreatNewLessonForm
