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
import Select from '@/components/ui/Select'
import { MultiValue } from 'react-select'

const CreateNewModuleSchema = Yup.object().shape({
    moduleName: Yup.string()
        .min(3, 'Module Name must be at least 3 characters')
        .required('Module Name is required'),
    lessons: Yup.array().required('Please select lessons'),
})
type LessonsType = {
    value: string
    label: string
}
type FormikData = {
    moduleName: string
    lessons: Array<LessonsType>
}

type editModuleType = {
    moduleName: string
    lessons: Array<LessonsType>
}
type CreateNewModuleFormProp = {
    onDialogClose:any
}
const CreateNewModuleForm:React.FC<CreateNewModuleFormProp> = ({onDialogClose}) => {
    const [editModuleData, setEditModuleData] = useState<editModuleType>()
    const [selectedLessons, setselectedLessons] = useState<LessonsType[]>([])

    const option = [
        { value: 'lesson 1', label: 'lesson 1' },
        { value: 'lesson 2', label: 'lesson 2' },
        { value: 'lesson 3', label: 'lesson 3' },
        { value: 'lesson 4', label: 'lesson 4' },
    ]

    const createFormData = (values: FormikData) => {
        const formData = new FormData()
        formData.append('moduleName', values.moduleName)
        values.lessons.forEach((lesson) => {
            formData.append('lessons', lesson.value)
        })
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
        onDialogClose()
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
        moduleName: '',
        lessons: [],
    })

    const editModuleInitialValues = () => ({
        moduleName: '',
        lessons: [],
    })

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

                            <div className=''>
                                <FormItem
                                    extra={asterisk}
                                    label="Module Name"
                                    invalid={
                                        errors.moduleName && touched.moduleName
                                    }
                                    errorMessage={errors.moduleName}
                                    className="w-full"
                                >
                                    <Field
                                        autoComplete="off"
                                        name="moduleName"
                                        component={Input}
                                        placeholder="Enter Module Name"
                                    />
                                </FormItem>

                                <FormItem
                                    extra={asterisk}
                                    label="Select Lessons to add in Module"
                                    invalid={Boolean(
                                        errors.lessons && touched.lessons
                                    )}
                                    errorMessage={errors.lessons as string}
                                    className="w-full"
                                >
                                    <Field name="lessons">
                                        {({ form }: FieldProps) => (
                                            <Select
                                                // value={selectedLessons}
                                                isMulti
                                                isSearchable
                                                placeholder="Please Select / Search Lesson to Add in Module"
                                                options={option}
                                                onChange={(
                                                    selectedOptions: MultiValue<LessonsType>
                                                ) => {
                                                    const selectedValues =
                                                        selectedOptions
                                                            ? selectedOptions.map(
                                                                (option) => ({
                                                                    value: option.value,
                                                                    label: option.label,
                                                                })
                                                            )
                                                            : []
                                                    form.setFieldValue(
                                                        'lessons',
                                                        selectedValues
                                                    )
                                                    setselectedLessons(
                                                        selectedValues
                                                    )
                                                }}
                                                
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                            </div>

                            <div className="mt-4 flex justify-end items-end ">
                                <Button
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    disabled={selectedLessons.length === 0}
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

export default CreateNewModuleForm
