import * as Yup from 'yup'

const feedbackCourseValidationSchema = Yup.object().shape({
    rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating must not exceed 5').required('Rating is required'),
    courseFeedback: Yup.string().required('Course feedback is required'),
})

export default feedbackCourseValidationSchema
