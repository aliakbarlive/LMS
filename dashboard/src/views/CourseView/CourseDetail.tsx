import React from 'react'
import { Course } from '@/@types'
import ReactHtmlParser from 'react-html-parser'

interface Iprops {
    courseDetail: Course
}
const CourseDetail = (props: Iprops) => {
    const { courseDetail } = props
    return (
        <>
            <div className=" flex flex-col-reverse py-5 px-5 lg:flex-row gap-10  lg:py-8 lg:pr-4 lg:px-8 m-0 ">
                <div className="flex flex-col  py-0 px-0 w-full lg:w-2/3 justify-start ">
                    <h2 className="text-4xl font-bold text-dark-blue mb-3 p-2">
                        {courseDetail.title}
                    </h2>
                    <p className="text-md text-dark-blue mb-5 ">
                        {courseDetail.objectivesTitle}
                    </p>
                    <p className="text-md text-dark-blue mb-5 ">
                        {ReactHtmlParser(courseDetail.courseOverview)}
                    </p>
                </div>
                <div className="w-full lg:w-1/3 flex flex-col  px-5 gap-y-5 lg:col-span-1">
                    <div className="border hover:shadow-2xl rounded-md">
                        <div className="overflow-hidden">
                            <iframe
                                className="w-full h-80 rounded-t-md"
                                src={`https://www.youtube.com/embed/${
                                    courseDetail.videoUrl.split('v=')[1]
                                }`}
                                title={courseDetail.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}
                            ></iframe>
                        </div>

                        <div className="p-4">
                            <h2 className="text-2xl line-clamp-1 font-bold text-dark-blue mb-5 ">
                                ${courseDetail.price}
                            </h2>
                            <h4 className="text-lg  text-black mb-4 ">
                                {courseDetail.topic}
                            </h4>
                            <h4 className="text-lg  text-black mb-4 ">
                                {courseDetail.duration} Duration
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CourseDetail
