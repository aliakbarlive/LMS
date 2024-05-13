import * as Yup from 'yup'

const CreateEditorUserSchema = Yup.object().shape({
    firstName: Yup.string().min(3, 'First Name must be at least 3 characters').required('First Name is required'),
    middleName: Yup.string().optional(),
    role: Yup.array().min(1, 'Select at least one option!'),
    lastName: Yup.string().min(3, 'First Name must be at least 3 characters').required('Last Name is required'),
    email: Yup.string().required('Email is required').email(),
    userName: Yup.string().required('User Name is required'),
    password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('Password is required'),
})

export default CreateEditorUserSchema
