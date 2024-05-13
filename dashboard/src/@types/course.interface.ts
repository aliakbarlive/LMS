export interface Course {
    _id: string
    title: string
    topic: string
    duration: string
    modality: string
    price: number
    image: string
    videoUrl: string
    postTitle: string
    courseOverview: string
    objectivesTitle: string
    access: string[]
    isCreatedByMe: boolean
    createdBy: {
        _id: string
        name: string
        user_type: string
        email: string
    }
}
