import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCourse } from '@/services/KnowledgeBaseService'

type Course = {
    _id: string
    title: string
    topic:string
    duration:string
    price:string
    modality:string
    coverImageCredit: string
    content: string
    category: string
    author:string
    starred: boolean
    updateTime: string
    createdBy: string
    timeToRead: number
    viewCount: number
}

type GetCourseRequest = { id: string }

type GetCourseResponse = Course

export type EditCourseState = {
    loading: boolean
    course: Partial<Course>
    categoryValue: string
    categoryLabel: string
    categoryId:string
    mode: string
}

export const SLICE_NAME = 'knowledgeBaseEditCourse'

export const getCourse = createAsyncThunk(
    SLICE_NAME + '/getCourse',
    async (param: GetCourseRequest) => {
        const response = await apiGetCourse<
            GetCourseResponse,
            GetCourseRequest
        >(param)
        return response.data
    }
)

const initialState: EditCourseState = {
    loading: false,
    course: {},
    categoryValue: '',
    categoryLabel: '',
    categoryId:'',
    mode: 'edit',
}

const editCourseSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setCourse: (state, action) => {
            state.course = action.payload
        },
        setCategory: (state, action) => {
            state.categoryValue = action.payload.categoryValue
            state.categoryLabel = action.payload.categoryLabel
            state.categoryId = action.payload.categoryId
        },
        setMode: (state, action) => {
            state.mode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourse.fulfilled, (state, action) => {
                state.loading = false
                state.course = action.payload
            })
            .addCase(getCourse.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setCourse, setCategory, setMode } = editCourseSlice.actions

export default editCourseSlice.reducer
