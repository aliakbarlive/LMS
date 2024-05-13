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
import ShowToast from '@/components/ui/Notification/ShowToast'


const CreateNewModuleSchema = Yup.object().shape({
    singleCourse: Yup.string().required('Please select a course'), 
    modules: Yup.array().of(
        Yup.object().shape({
            value: Yup.string().required('Value is required'),
            label: Yup.string().required('Label is required')
        })
    ).min(1, 'Please select at least one lesson') 
});


type modulesType = {
    value: string
    label: string
}
type FormikData = {
    singleCourse: string
    modules: Array<modulesType>
}

type editModuleType = {
    singleCourse: string
    modules: Array<modulesType>
}
type CreateNewModuleFormProp = {
    onDialogClose:any
}
const ImportModuleOtherCourseForm:React.FC<CreateNewModuleFormProp> = ({onDialogClose}) => {
    const [editModuleData, setEditModuleData] = useState<editModuleType>()
    const [selectedModules, setSelectedModules] = useState<modulesType[]>([])

    const option = [
        { value: 'lesson 1', label: 'lesson 1' },
        { value: 'lesson 2', label: 'lesson 2' },
        { value: 'lesson 3', label: 'lesson 3' },
        { value: 'lesson 4', label: 'lesson 4' },
    ]

    const createFormData = (values: FormikData) => {
        const formData = new FormData()
        formData.append('singleCourse', values.singleCourse)
        values.modules.forEach((lesson) => {
            formData.append('modules', lesson.value)
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
        // for now dummy action placed for Toast 
        values ? ShowToast('success', 'Success Imported') :ShowToast('danger', 'Tmport Failed');
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
            ShowToast('danger', 'Tmport Failed')
            setSubmitting(false)
        }
    }

    const moduleInitialValues = () => ({
        singleCourse: '',
        modules: [],
    })

    const editModuleInitialValues = () => ({
        singleCourse: '',
        modules: [],
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
                                    label="Select  Course"
                                    invalid={Boolean(
                                        errors.singleCourse && touched.singleCourse
                                    )}
                                    errorMessage={errors.singleCourse as string}
                                    className="w-full"
                                >
                                    <Field name="singleCourse">
                                        {({ form, field }: FieldProps<string>) => (
                                            <Select
                                            isSearchable
                                            placeholder="Please Select / Search Course"
                                            options={option}
                                            onChange={(selectedOption: modulesType | null) => {
                                                form.setFieldValue('singleCourse', selectedOption ? selectedOption.value : '');
                                            }}
                                            value={option.find((opt) => opt.value === field.value)}
                                            />
                                        )}
                                    </Field>

                                </FormItem>

                                <FormItem
                                    extra={asterisk}
                                    label="Select modules to add in Course"
                                    invalid={Boolean(
                                        errors.modules && touched.modules
                                    )}
                                    errorMessage={errors.modules as string}
                                    className="w-full"
                                >
                                    <Field name="modules">
                                        {({ form }: FieldProps) => (
                                            <Select
                                                // value={selectedLessons}
                                                isMulti
                                                isSearchable
                                                placeholder="Please Select / Search Module to Add in course"
                                                options={option}
                                                onChange={(
                                                    selectedOptions: MultiValue<modulesType>
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
                                                        'modules',
                                                        selectedValues
                                                    )
                                                    setSelectedModules(
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
                                    disabled={selectedModules.length === 0}
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

export default ImportModuleOtherCourseForm
