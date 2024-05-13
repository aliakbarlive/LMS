import { ISignUpForm, SignInCredential } from '@/@types/Form/auth/auth'
import * as Yup from 'yup'

// export const SignUpValidationSchema: Yup.ObjectSchema<ISignUpForm> =
//     Yup.object().shape({
//         email: Yup.string()
//             .required('Please enter your email')
//             .email('Invalid email'),
//         password: Yup.string().required('Please enter your password'),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
//             .required('Confirm Password is required'),
//         name: Yup.string().required('Please enter your full name'),
//         countryCode: Yup.string().required('Please select a country'),
//         phone: Yup.string().required('Please enter your phone number'),
//         experience: Yup.string().required('Please enter your experience'),
//         organization: Yup.string().required(
//             'Please enter your organization name'
//         ),
//     })
const instructorValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().email().required('Please enter your email'),
    experience: Yup.array()
        .of(Yup.string())
        .required('Please enter your experience'),
    skills: Yup.array().of(Yup.string()).required('Please enter your skills'),
})

const organizationValidationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required().email('Please enter a valid email'),
    expertise: Yup.array()
        .of(Yup.string())
        .required('Please enter your expertise'),
    orgBackground: Yup.string().required(
        'Please enter your organization background'
    ),
})
export const SignUpValidationSchema = Yup.object().shape({
    name: Yup.string().required().min(3),
    // user_type: Yup.string()
    //     .oneOf(['Student', 'Instructor', 'Organization'])
    //     .required('user type is required'),
    // countryCode: Yup.string()
    //     .matches(/^\+\d{1,3}$/, 'Invalid country code')
    //     .required('country code is required'),
    // phone: Yup.string()
    //     .matches(/^\d{7,15}$/, 'Invalid phone number')
    //     .required('phone number is required'),
    email: Yup.string()
        .required('Please enter your email')
        .email('Invalid email'),
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), undefined],
        'Passwords must match'
    ),
    userTypeData: Yup.mixed().test({
        test: function (value) {
            const { user_type } = this.parent
            if (user_type === 'Instructor') {
                return instructorValidationSchema.isValid(value)
            } else if (user_type === 'Organization') {
                return organizationValidationSchema.isValid(value)
            } else {
                return true
            }
        },
    }).optional(),
})

export const SignInValidationSchema: Yup.ObjectSchema<SignInCredential> =
    Yup.object().shape({
        email: Yup.string()
            .required('Please enter your email')
            .email('Invalid email'),
        password: Yup.string().required('Please enter your password'),
    })
