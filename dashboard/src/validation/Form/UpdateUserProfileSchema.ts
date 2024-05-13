import * as Yup from 'yup'

const UpdateUserProfileSchema = Yup.object().shape({
    firstName: Yup.string().min(3),
    // firstName: Yup.string().min(3).required('First Name is required'),
    // middleName: Yup.string().min(3).optional(),
    lastName: Yup.string().min(3),
    // lastName: Yup.string().min(3).required('Last Name is required'),
    // email: Yup.string().required('Email is required').email(),
    userName: Yup.string().min(4),
    // userName: Yup.string().min(4).required('User Name is required'),
    // newPassword: Yup.string().min(8, 'Password must be 8 characters long')
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[a-z]/, 'Password requires a lowercase letter')
    // .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[^\w]/, 'Password requires a symbol').optional(),
    // confirmPassword: Yup.string().oneOf(
    //     [Yup.ref('newPassword'), undefined],
    //     'Passwords must match with new password'
    // ),
})

export default UpdateUserProfileSchema
