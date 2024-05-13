import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { Field, Form, Formik, FormikContext, useFormikContext } from 'formik'
import { useAppSelector } from '../store'
import {
    apiGetCategories,
    apiPostArticle,
    apiUpdateArticle,
} from '@/services/KnowledgeBaseService'
import { useNavigate } from 'react-router-dom'
import parse from 'react-html-parser'

import * as Yup from 'yup'
import type { FieldProps } from 'formik'
import { Upload } from '@/components/ui'
import { FcImageFile } from 'react-icons/fc'

type FormModel = {
    title: string
    metaTitle:string
    metaDescription: string
    coverImageCredit: string
    content: string
    value: string
    coverImage: File | null
}
type CategoryType = {
    label: string
    value: string
    _id: string
}
const beforeCoverImageUpload = (files: FileList | null, fileList: File[]) => {
    let valid: string | boolean = true
    const maxUpload = 1

    const allowedFileType = ['image/jpeg', 'image/png','image/webp']
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
const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    metaTitle: Yup.string().required('Meta Title is required'),
    metaDescription: Yup.string().required('Meta description is required'),
    value: Yup.string().required('Category required'),
    // coverImage: Yup.mixed().optional('Cover Image is a required field'),
    content: Yup.string().required('Content required'),
})

const Editor = ({ mode }: { mode: string }) => {
    const navigate = useNavigate()
    const [avatarImg, setAvatarImg] = useState<string | null>(null)

    const onFileUpload = (files: File[], form: any) => {
        if (files.length > 0) {
            const uploadedFile = files[0] // Get the first file from the array
            const fileNameWithExtension = uploadedFile.name // Get the file name with its extension
            setAvatarImg(fileNameWithExtension) // Set the filename with extension to the state variable
            form.setFieldValue('coverImage', uploadedFile)
        }
    }
    const article = useAppSelector(
        (state) => state.knowledgeBaseEditArticle.data.article
    )
    const categoryLabel = useAppSelector(
        (state) => state.knowledgeBaseEditArticle.data.categoryLabel
    )
    const categoryValue = useAppSelector(
        (state) => state.knowledgeBaseEditArticle.data.categoryValue
    )
    const categoryId = useAppSelector(
        (state) => state.knowledgeBaseEditArticle.data.categoryId
    )

    const [categoryList, setCategoryList] = useState<CategoryType[]>([])

    const getCategoryId = (selectedValue: string) => {
        const selectedCategory = categoryList.find(
            (category) => category.value === selectedValue
        )

        return selectedCategory ? selectedCategory._id : null
    }

    const onComplete = async (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const categoryId = getCategoryId(values.value)
        const base64CoverImage = values.coverImage
            ? await readFileAsBase64(values.coverImage)
            : null

        const newData = {
            ...article,
            ...values,
            content:values.content,
            category: categoryId,
            _id: article._id,
            coverImage: base64CoverImage,
        }
        if (mode == 'add') {
            const resp = await apiPostArticle(newData)
            setSubmitting(false)
            if (resp.data) {
                toast.push(
                    <Notification
                        title={`Successfully ${mode} article`}
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/manage-articles')
            }
        } else {
            const resp = await apiUpdateArticle(newData)
            setSubmitting(false)
            if (resp.data) {
                toast.push(
                    <Notification
                        title={`Successfully ${mode} article`}
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
                navigate('/manage-articles')
            }
        }
    }

    useEffect(() => {
        if (categoryLabel && categoryValue) {
            setCategoryList((prev) => [
                ...prev,
                { label: categoryLabel, value: categoryValue, _id: categoryId },
            ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryLabel, categoryValue])
    const fetchData = async () => {
        const response = await apiGetCategories()
        setCategoryList(response.data as CategoryType[])
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Formik
            enableReinitialize
            initialValues={{
                title:
                    mode === 'add'
                        ? ''
                        : (mode === 'edit' || mode === 'preview') &&
                          article.title
                        ? article.title
                        : '',
                        metaTitle:
                        mode === 'add'
                            ? ''
                            : (mode === 'edit' || mode === 'preview') &&
                              article.metaTitle
                            ? article.metaTitle
                            : '',
                            metaDescription:
                            mode === 'add'
                                ? ''
                                : (mode === 'edit' || mode === 'preview') &&
                                  article.metaDescription
                                ? article.metaDescription
                                : '',
                            coverImageCredit:
                            mode === 'add'
                                ? ''
                                : (mode === 'edit' || mode === 'preview') &&
                                  article.coverImageCredit
                                ? article.coverImageCredit
                                : '',
                content:
                    mode === 'add'
                        ? ''
                        : (mode === 'edit' || mode === 'preview') &&
                          article.content
                        ? article.content
                        : '',
                value: categoryValue,
                coverImage: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onComplete(values, setSubmitting)
            }}
        >
            {({ values, touched, errors, isSubmitting }) => {
                return (
                    <Form>
                        {mode === 'preview' ? (
                            <div className="mt-6">
                                <h4 className="mb-4">{values.title}</h4>
                                <div className="prose dark:prose-invert max-w-none">
                                    {parse(`<body class="sun-editor-editable" style="margin:10px auto !important; height:auto !important;" data-new-gr-c-s-check-loaded="14.1147.0" data-gr-ext-installed="">
                                ${values.content}</body>`)}
                                </div>
                            </div>
                        ) : (
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
                                        placeholder="Article Title"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Meta Title"
                                    invalid={errors.metaTitle && touched.metaTitle}
                                    errorMessage={errors.metaTitle}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="metaTitle"
                                        component={Input}
                                        placeholder="Add Meta Tag"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Meta Description"
                                    invalid={errors.metaDescription && touched.metaDescription}
                                    errorMessage={errors.metaDescription}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="metaDescription"
                                        component={Input}
                                        placeholder="Add Meta Description"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Cover Image"
                                    invalid={
                                        errors.coverImage && touched.coverImage
                                    }
                                    errorMessage={errors.coverImage}
                                >
                                    <Field name="coverImage">
                                        {({ field, form }: FieldProps) => (
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
                                                } // Update form value
                                            >
                                                <div className="my-2 text-center">
                                                    <div className="text-6xl mb-4 flex justify-center">
                                                        <FcImageFile />
                                                    </div>
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
                                                        <br />
                                                        The image ratio should be 5:3
                                                    </p>
                                                </div>
                                            </Upload>
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="Cover Image Credit"
                                    invalid={errors.coverImageCredit && touched.coverImageCredit}
                                    errorMessage={errors.coverImageCredit}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="coverImageCredit"
                                        component={Input}
                                        placeholder="Add Cover Image Credit"
                                    />
                                </FormItem>
                                <FormItem
                                    label="Category"
                                    invalid={errors.value && touched.value}
                                    errorMessage={errors.value}
                                >
                                    <Field name="value">
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                placeholder="Category"
                                                field={field}
                                                form={form}
                                                options={categoryList}
                                                value={categoryList.filter(
                                                    (category) =>
                                                        category.value ===
                                                        values.value
                                                )}
                                                onChange={(category) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        category?.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="Content"
                                    className="mb-0"
                                    labelClass="!justify-start"
                                    invalid={errors.content && touched.content}
                                    errorMessage={errors.content}
                                >
                                    <Field name="content">
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
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </FormContainer>
                        )}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Editor
