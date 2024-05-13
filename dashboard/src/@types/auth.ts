export type SignInCredential = {
    userName: string
    password: string
    user_type: string
    _id: string
}
export interface Organization {
    bio: string
    expertise: string[]
    orgBackground: string
    createdAt: string
    updatedAt: string
}
export interface Instructor {
    skills: string[]
    expertise: string[]
    createdAt: string
    updatedAt: string
}

export type SignUpResponse = {
    status: string
    mesg: string
}

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
