// Define interface for instructor data
interface InstructorData {
    experience: string[]
    skills: string[]
}

// Define interface for organization data
interface OrganizationData {
    expertise: string[]
    orgBackground: string
}

// Define interface for signup form data
export interface ISignUpForm {
    name: string
    user_type: 'Student' | 'Instructor' | 'Organization'
    countryCode: string
    phone: string
    email: string
    password: string
    confirmPassword: string
    userTypeData: InstructorData | OrganizationData | null
}

// export interface ISignUpForm {
//     email: string
//     password: string
//     confirmPassword: string
//     name: string
//     countryCode: string
//     phone: string
//     user_type: string
//     experience: string
//     organization: string
//     skill: string
// }
export type TSignUpForm = {
    email: string
    password: string
    confirmPassword: string
    fullName: string
    countryCode: string
    phone: string
}
export type SignInCredential = {
    email: string
    user_type: string
    _id: string
    name: string
    userTypeData: InstructorData | OrganizationData | null
}

export type SignInResponse = {
    status: boolean
    msg: string
    user: {
        userName: string
        email: string
        firstName: string
        lastName: string
        profilePic: string
        is_verified: boolean
        role: string
        _id: string
        createdAt: string
        updatedAt: string
    }
}
export type SignUpResponse = {
    success: boolean
    message: string
}

export type SignUpCredential = TSignUpForm

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
