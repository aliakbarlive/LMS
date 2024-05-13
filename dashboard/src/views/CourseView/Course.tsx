import React, { useEffect, useRef, useState } from 'react'
import CourseDetail from './CourseDetail'
import { CourseState, getAllCourses, useAppDispatch, useAppSelector } from '@/store'
import { useParams } from 'react-router-dom'
import { Course as ICourse } from '@/@types'

function Course() {
    const { courseId } = useParams<{ courseId: string }>()
    const dispatch = useAppDispatch()
    const isRendering = useRef(false)
    const { selectedCourse, allCourseList }: CourseState = useAppSelector((state) => state.courseSlice)
    let localCourse: ICourse | undefined = selectedCourse

    useEffect(() => {
        if (allCourseList.length === 0 && !isRendering.current) {
            dispatch(getAllCourses())
            isRendering.current = true
        }
    }, [])
    if (allCourseList.length > 0 && isRendering.current) {
        const findCourse = allCourseList.find(
            (course: ICourse) => course._id === courseId
        )
        localCourse = findCourse
    }

    return (
        <>
            <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
                <div className="mx-auto  px-4 md:px-8">
                    <section className="relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100  shadow-lg py-16">
                        <img src={localCourse?.image} loading="lazy" alt="course feature image" className="absolute h-full w-full object-cover object-center" />
                        <div className="absolute inset-0 bg-gray-500 mix-blend-multiply"></div>
                        <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
                            <p className="mb-4 text-center text-lg text-gray-100 sm:text-xl md:mb-8">Course Details</p>
                            {
                                localCourse && <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">{localCourse?.title}</h1>
                            }
                        </div>
                    </section>
                </div>
               
            </div>
            <div className="w-full rounded-lg">
                <div className="grid grid-cols-1 m-auto  gap-8 ">
                    {localCourse && <CourseDetail courseDetail={localCourse} />}
                </div>
            </div>
        </>
    )
}

export default Course
