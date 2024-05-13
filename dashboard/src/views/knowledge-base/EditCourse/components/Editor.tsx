import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { Field, Form, Formik, FormikContext, useFormikContext } from 'formik'
import reducer, { useAppSelector } from '../store'
import { useNavigate, useParams } from 'react-router-dom'
import type { FieldProps } from 'formik'
import { Upload } from '@/components/ui'
import { FcImageFile } from 'react-icons/fc'
import { courseValidationSchema } from '@/validation'
import { Course } from '@/@types'
import axios from 'axios'
import appConfig from '@/configs/app.config'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import {
    CourseState,
    addNewCourse,
    updateCourse,
    useAppDispatch,
} from '@/store'

type FormikData = {
    title: string
    topic: string
    duration: string
    price: string
    modality: string
    image: any
    postTitle: string
    videoUrl: string
    objectivesTitle: string
    courseOverview: string
}

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

const Editor = () => {
    const navigate = useNavigate()
    const [avatarImg, setAvatarImg] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const { courseId } = useParams()
    const { selectedCourse }: CourseState = useAppSelector(
        (state) => state.courseSlice
    )
    const onFileUpload = (files: File[], form: any) => {
        if (files && files.length > 0) {
            const uploadedFile = files[0] // Get the first file from the array
            const fileNameWithExtension = uploadedFile.name // Get the file name with its extension
            setAvatarImg(fileNameWithExtension) // Set the filename with extension to the state variable
            form.setFieldValue('image', uploadedFile)
            // console.log('uploadedFile', uploadedFile)
            readFileAsBase64(uploadedFile)
        }
    }

    const createFormData = (values: FormikData) => {
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('topic', values.topic)
        formData.append('duration', values.duration)
        formData.append('price', values.price)
        formData.append('modality', values.modality)
        formData.append('image', values.image)
        formData.append('postTitle', values.postTitle)
        formData.append('videoUrl', values.videoUrl)
        formData.append('objectivesTitle', values.objectivesTitle)
        formData.append('courseOverview', values.courseOverview)
        return formData
    }

    const makeRequest = async (
        method: 'post' | 'patch',
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
        try {
            const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
            const persistData = deepParseJson(rawPersistData)
            const accessToken = (persistData as any).auth.session.token
            const baseUrl = `${appConfig.baseUrl}/${appConfig.apiPrefix}`
            if (selectedCourse._id === courseId) {
                const response = await makeRequest(
                    'patch',
                    `${baseUrl}/course/${selectedCourse._id}`,
                    formData,
                    accessToken
                )
                if (response) {
                    dispatch(updateCourse({ ...response }))
                    toast.push(
                        <Notification
                            title={`Successfully updated course`}
                            type="success"
                        />,
                        {
                            placement: 'top-center',
                        }
                    )
                    navigate('/course-list')
                }
            } else {
                const response = await makeRequest(
                    'post',
                    `${baseUrl}/course`,
                    formData,
                    accessToken
                )
                if (response.data) {
                    dispatch(addNewCourse({ ...response.data }))
                    toast.push(
                        <Notification
                            title={`Successfully ${
                                courseId ? 'updated' : 'created'
                            } course`}
                            type="success"
                        />,
                        {
                            placement: 'top-center',
                        }
                    )
                    navigate('/course-list')
                }
            }
        } catch (error) {
            toast.push(
                <Notification
                    title={`course not ${courseId ? 'updated' : 'created'}`}
                    type="danger"
                />,
                {
                    placement: 'top-center',
                }
            )
            console.log(error)
        }
    }

    const courseInitialValues = () => ({
        title: '',
        topic: '',
        duration: '',
        price: '0',
        modality: '',
        image: '',
        postTitle: '',
        videoUrl: '',
        objectivesTitle: '',
        courseOverview: '',
    })

    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...(selectedCourse._id === courseId
                    ? selectedCourse
                    : courseInitialValues()),
                image: '',
            }}
            validationSchema={courseValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onComplete(values, setSubmitting)
            }}
        >
            {({ values, touched, errors, isSubmitting }) => {
                return (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Title"
                                invalid={errors.title && touched.title}
                                errorMessage={errors.title}
                            >
                                <Field
                                    autoComplete="off"
                                    name="title"
                                    component={Input}
                                    placeholder="Course Title"
                                />
                            </FormItem>
                            <FormItem
                                label="Topic"
                                invalid={errors.topic && touched.topic}
                                errorMessage={errors.topic}
                            >
                                <Field
                                    autoComplete="off"
                                    name="topic"
                                    component={Input}
                                    placeholder="Add Topic"
                                />
                            </FormItem>
                            <FormItem
                                label="Modality"
                                invalid={errors.modality && touched.modality}
                                errorMessage={errors.modality}
                            >
                                <Field
                                    autoComplete="off"
                                    name="modality"
                                    component={Input}
                                    placeholder="modality"
                                />
                            </FormItem>
                            <FormItem
                                label="Duration"
                                invalid={errors.duration && touched.duration}
                                errorMessage={errors.duration}
                            >
                                <Field
                                    autoComplete="off"
                                    name="duration"
                                    component={Input}
                                    placeholder="Add Course Duration"
                                />
                            </FormItem>
                            <FormItem
                                label="Price"
                                invalid={errors.price && touched.price}
                                errorMessage={errors.price}
                            >
                                <Field
                                    autoComplete="off"
                                    name="price"
                                    component={Input}
                                    placeholder="Price"
                                />
                            </FormItem>
                            <FormItem
                                label="Cover Image"
                                invalid={errors.image && touched.image}
                                errorMessage={errors.image}
                            >
                                <Field name="image">
                                    {({ field, form }: FieldProps) => (
                                        <Upload
                                            draggable
                                            beforeUpload={
                                                beforeCoverImageUpload
                                            }
                                            fileList={
                                                field.value ? [field.value] : []
                                            }
                                            showList
                                            onChange={(files) =>
                                                onFileUpload(files, form)
                                            } // Update form value
                                        >
                                            <div className="my-2 text-center">
                                                <div className="text-6xl mb-4 flex justify-center">
                                                    <FcImageFile />
                                                </div>
                                                <p className="font-semibold">
                                                    <span className="text-gray-800 dark:text-white">
                                                        Drop your image here, or{' '}
                                                    </span>
                                                    <span className="text-blue-500">
                                                        browse
                                                    </span>
                                                </p>
                                                <p className="mt-1 opacity-60 dark:text-white">
                                                    Support: jpeg, png
                                                    <br />
                                                    The image ratio should be
                                                    5:3
                                                </p>
                                            </div>
                                        </Upload>
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="Post Title"
                                invalid={errors.postTitle && touched.postTitle}
                                errorMessage={errors.postTitle}
                            >
                                <Field
                                    autoComplete="off"
                                    name="postTitle"
                                    component={Input}
                                    placeholder="Add Post Title"
                                />
                            </FormItem>

                            <FormItem
                                label="Video Url"
                                invalid={errors.videoUrl && touched.videoUrl}
                                errorMessage={errors.videoUrl}
                            >
                                <Field
                                    autoComplete="off"
                                    name="videoUrl"
                                    component={Input}
                                    placeholder="Add Video Url"
                                />
                            </FormItem>
                            <FormItem
                                label="Objectives Title"
                                invalid={
                                    errors.objectivesTitle &&
                                    touched.objectivesTitle
                                }
                                errorMessage={errors.objectivesTitle}
                            >
                                <Field
                                    autoComplete="off"
                                    name="objectivesTitle"
                                    component={Input}
                                    placeholder="Add Objectives Title"
                                />
                            </FormItem>
                            <FormItem
                                label="Content"
                                className="mb-0"
                                labelClass="!justify-start"
                                invalid={
                                    errors.courseOverview &&
                                    touched.courseOverview
                                }
                                errorMessage={errors.courseOverview}
                            >
                                <Field name="courseOverview">
                                    {({ field, form }: FieldProps) => {
                                        return (
                                            <RichTextEditor
                                                setContents={field.value}
                                                onChange={(val: any) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        val
                                                    )
                                                }
                                            />
                                        )
                                    }}
                                </Field>
                            </FormItem>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    // loading={isSubmitting}
                                    loading={false}
                                    variant="solid"
                                    type="submit"
                                >
                                    {courseId ? 'Update' : 'Submit'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Editor
