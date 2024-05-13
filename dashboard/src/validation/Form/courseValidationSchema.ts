import * as Yup from 'yup'

const courseValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    topic: Yup.string().required('Topic is required'),
    duration: Yup.string().required('Duration is required'),
    price: Yup.number().required('Price is required'),
    modality: Yup.string().required('Modality is required'),
    // image: Yup.string()
    //     .required('Image is required'),
    // pageContent: Yup.object().shape({
    postTitle: Yup.string().required('Post title is required'),
    videoUrl: Yup.string()
        .url('Video URL must be valid')
        .required('Video URL is required'),
    objectivesTitle: Yup.string().required('Objectives title is required'),
    courseOverview: Yup.string().required('Course overview is required'),
    // }),
})

export default courseValidationSchema
