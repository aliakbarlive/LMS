import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course } from '@/@types'
import { apiGetAllCourse } from '@/services/KnowledgeBaseService'

export interface CourseState {
    loadingAllCourses: boolean
    allCourseList: Course[]
    selectedCourse: Course
}
const initialState: CourseState = {
    loadingAllCourses: false,
    allCourseList: [],
    selectedCourse: {
        isCreatedByMe: false,
        _id: '',
        duration: '',
        image: '',
        modality: '',
        courseOverview: '',
        objectivesTitle: '',
        postTitle: '',
        videoUrl: '',
        price: 0,
        title: '',
        topic: '',
        access: [],
        createdBy: {
            _id: '',
            email: '',
            name: '',
            user_type: '',
        },
    },
}
export const SLICE_NAME = 'courseSlice'
type getAllCoursesResponse = Course
export const getAllCourses = createAsyncThunk(
    SLICE_NAME + '/course',
    async () => {
        const response = await apiGetAllCourse<getAllCoursesResponse>()
        return response.data
    }
)

const courseSlice = createSlice({
    name: `${SLICE_NAME}/course`,
    initialState,
    reducers: {
        setCourse(state, action: PayloadAction<Course>) {
            const {
                _id,
                duration,
                image,
                modality,
                price,
                title,
                topic,
                courseOverview,
                objectivesTitle,
                postTitle,
                videoUrl,
                isCreatedByMe,
            } = action.payload
            const { selectedCourse } = state
            selectedCourse._id = _id
            selectedCourse.duration = duration
            selectedCourse.image = image
            selectedCourse.modality = modality
            selectedCourse.title = title
            selectedCourse.topic = topic
            selectedCourse.price = price
            selectedCourse.courseOverview = courseOverview
            selectedCourse.objectivesTitle = objectivesTitle
            selectedCourse.postTitle = postTitle
            selectedCourse.videoUrl = videoUrl
            selectedCourse.isCreatedByMe = isCreatedByMe
        },
        
        addNewCourse(state, action: PayloadAction<Course>) {
            state.allCourseList.unshift(action.payload)
        },

        updateCourse(state, action: PayloadAction<Course>) {
            const index = state.allCourseList.findIndex(
                (course) => course._id === action.payload._id
            )
            if (index > -1) {
                state.allCourseList[index] = action.payload
            }
        },
    },
    extraReducers: (courses) => {
        courses.addCase(
            getAllCourses.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loadingAllCourses = false
                state.allCourseList = action.payload.courses
            }
        )
        courses.addCase(getAllCourses.pending, (state) => {
            state.loadingAllCourses = true
        })
        courses.addCase(getAllCourses.rejected, (state) => {
            state.loadingAllCourses = false
        })
    },
})

export const { setCourse, addNewCourse, updateCourse } = courseSlice.actions
export default courseSlice.reducer
