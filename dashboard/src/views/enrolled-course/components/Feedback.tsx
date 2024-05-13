import { Field, Form, Formik} from 'formik'
import { feedbackCourseValidationSchema } from '@/validation'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Rating from '@/components/shared/Rating'
import ShowToast from '@/components/ui/Notification/ShowToast'
import TextArea from '@/components/ui/TextArea'



type FormikData = {
    rating: number
    courseFeedback: string
}



const onFeedbackComplete = async (
    values: FormikData,
    setSubmitting: (isSubmitting: boolean) => void
) => {
    setSubmitting(true)
    console.log(values)
    try {

        // make api call here
        

    } catch (error) {
        console.error(error)
    }
   
    // dummy api call for loading state
   setTimeout(()=>{
    setSubmitting(false)
    ShowToast('success', 'Feedback submitted')
   },1000)
}

const feedbackCourseInitialValues = {
    rating: 0,
    courseFeedback: '',

}
const Feedback = () => {  

    return (
        <div className="p-5 pt-0">
            <Formik
                enableReinitialize
                initialValues={feedbackCourseInitialValues}
                validationSchema={feedbackCourseValidationSchema}
                onSubmit={(values, { setSubmitting ,resetForm  }) => {
                    onFeedbackComplete(values, setSubmitting)
                    console.log(values)
                    resetForm();
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <FormItem
                                label="Rating"
                                className="mb-8"
                                labelClass="justify-start"
                                invalid={errors.rating && touched.rating}
                                errorMessage={errors.rating}
                            >
                               <Field name="rating">
                                        {({ field }: { field: any}) => (
                                            <Rating
                                                count={5}
                                                value={values.rating}
                                                className='flex'
                                                edit={true}
                                                onChange={(value) =>
                                                    field.onChange({
                                                        target: {
                                                            name: 'rating',
                                                            value: value,
                                                        },
                                                    })
                                                }
                                            />
                                        )}
                                    </Field>
                            </FormItem>
                                <FormItem
                                    label="Course Feedback"
                                    className="mb-0"
                                    labelClass="justify-start"
                                    invalid={
                                        errors.courseFeedback &&
                                        touched.courseFeedback
                                    }
                                    errorMessage={errors.courseFeedback}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="courseFeedback"
                                        component={TextArea}
                           
                                        placeholder="Write your Feedback here"
                                    />
                                </FormItem>
                                <div className="mt-8 flex justify-center">
                                    <Button
                                        loading={isSubmitting ? true :false}
                                        variant="solid"
                                        type="submit"
                                    >
                                        Submit Feedback
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Feedback