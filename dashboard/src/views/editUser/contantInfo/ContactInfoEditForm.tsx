import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import { Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import { LuAsterisk } from "react-icons/lu";


type FormikData = {
    homePhone: number 
    workPhone: number 
}

const optional = <span className="ml-1 opacity-60">(optional)</span>
const asterisk= <span><LuAsterisk color='red'/></span>

const UpdateUserSchema = Yup.object().shape({
    homePhone: Yup.number().required('Home phone number is required'),
    workPhone: Yup.number().required('Work phone number is required'),

})

const ContactInfoEditForm = () => {

    const createFormData = (values: FormikData) => {
        const formData = new FormData();
        // formData.append('homePhone', values.homePhone)
        // formData.append('workPhone', values.workPhone)
        return formData
    }
    const onComplete =  async(
        values: FormikData,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const formData = createFormData(values);
        console.log("formData>>>>>",formData);
    }

    const courseInitialValues = () => ({
        homePhone:null,
        workPhone: null,
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
                                    label="Home Phone"
                                    invalid={errors.homePhone && touched.homePhone}
                                    errorMessage={errors.homePhone}
                                    className='w-full'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="homePhone"
                                        component={Input}
                                        placeholder="Enter Home Phone"
                                    />
                                </FormItem>
                               
                                <FormItem
                                    extra={asterisk}
                                    label="Work Phone"
                                    invalid={errors.workPhone && touched.workPhone}
                                    errorMessage={errors.workPhone}
                                    className='w-full'
                                >
                                    <Field
                                        autoComplete="off"
                                        name="workPhone"
                                        component={Input}
                                        placeholder="Enter Work Phone"
                                    />
                                </FormItem>
                            </div>
                            <div>
                                <h4 className='pb-4'>EMERGENCY CONTACT INFO</h4>
                                <div className="flex gap-0 justify-between flex-col sm:flex-row sm:gap-4">
                                    <FormItem
                                        extra={asterisk}
                                        label="First Name"
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
                                        extra={asterisk}
                                        label="Last Name"
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
                                <div className="flex gap-0 justify-between flex-col sm:flex-row sm:gap-4">
                                    <FormItem
                                        extra={asterisk}
                                        label="Company Name"
                                        className='w-full'
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="companyName"
                                            component={Input}
                                            placeholder="Enter company Name"
                                        />
                                    </FormItem>
                                    <FormItem
                                        extra={asterisk}
                                        label="company Phone"
                                        className='w-full'
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="companyPhone"
                                            component={Input}
                                            placeholder="Enter Phone"
                                        />
                                    </FormItem>
                                </div>
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

export default ContactInfoEditForm
