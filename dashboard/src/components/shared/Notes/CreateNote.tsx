import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'

type FormModel = {
    content: string
}

const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content required'),
})

const CreateNote = ({ mode }: { mode: string }) => {

    const onComplete =  (values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        console.log(values)
    }
    return (
        <Formik
            enableReinitialize
            initialValues={
                {
                    content :
                        mode === 'add' 
                            ? ''
                            : 'fetched content'
                }
            }
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onComplete(values, setSubmitting)
            }}
        >
            {({ values, touched, errors, isSubmitting }) => {
                return (
                    <Form>
                     
                            <FormContainer>
                                <FormItem
                                    label="Note"
                                    className="mb-0 h-1/2"
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
                        
                    </Form>
                )
            }}
        </Formik>
    )
}

export default CreateNote
