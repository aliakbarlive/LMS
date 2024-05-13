import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import Skeleton from './Skeleton' // import Skeleton component
import CoursescardTemplate from './CourseCard' // import CoursescardTemplate component
import fetchDataFromApi from './api' // import fetchDataFromApi function
import { PaginationData } from './PaginationData' // import types for CourseData and PaginationData
import { Course } from '@/@types'
import appConfig from '@/configs/app.config'
import { getAllCourses, useAppDispatch, useAppSelector } from '@/store'

const Coursescard: React.FC = () => {
    const isRendering = useRef(false)
    const dispatch = useAppDispatch()
    const location = useLocation()
    const { allCourseList, loadingAllCourses } = useAppSelector(
        (state) => state.courseSlice
    )
    // const [currentPage, setCurrentPage] = useState<number>(1)
    // const [paginationData, setPaginationData] = useState<PaginationData | null>(null)
    // const [loading, setLoading] = useState<boolean | null>(null)

    // const paginate = ({ selected }: { selected: number }) => {
    //     setCurrentPage(selected + 1)
    // }
    // const [courses, setCourses] = useState<Course[] | null>(allCourseList)
    // async function getCourseDataPagination() {
    //     setLoading(true)
    //     try {
    //         const res = await fetchDataFromApi(
    //             `${appConfig.baseUrl}/${appConfig.apiPrefix}/course/all?page=${currentPage}`
    //         )
    //         if (res.data) {
    //             setCourses(res.data)
    //             setLoading(false)
    //             setPaginationData(res.pagination)
    //             setCurrentPage(res.pagination.currentPage || 1)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        if (!isRendering.current && allCourseList.length === 0) {
            dispatch(getAllCourses())
            isRendering.current = true
        }
    }, [])

    return (
        <>
            <div className="flex flex-wrap gap-y-[30px]">
                {loadingAllCourses ? (
                    <>
                        {Array.from({ length: 7 }).map((_, index) => (
                            <Skeleton key={index} />
                        ))}
                    </>
                ) : allCourseList && allCourseList.length > 0 ? (
                    allCourseList.map((item) => (
                        <CoursescardTemplate key={item?._id} data={item} />
                    ))
                ) : (
                    <p className="py-5">No courses found!</p>
                )}
            </div>
            {/* <div className="py-5">
                <ReactPaginate
                    onPageChange={paginate}
                    pageCount={paginationData?.totalPages || 1}
                    previousLabel="Prev"
                    nextLabel="Next"
                    containerClassName="pagination flex gap-5 justify-center"
                    pageLinkClassName="page-number"
                    previousLinkClassName="page-number bg-theme-green font-sans text-black font-semibold py-2 px-4 ml-2 rounded-full hover:bg-dark-blue"
                    nextLinkClassName="page-number bg-theme-green font-sans text-black font-semibold py-2 px-4 ml-2 rounded-full hover:bg-dark-blue"
                    activeLinkClassName="active text-black bg-theme-green p-2 rounded-full"
                />
            </div> */}
        </>
    )
}

export default Coursescard
