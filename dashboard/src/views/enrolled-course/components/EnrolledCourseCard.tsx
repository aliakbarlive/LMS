import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { enrolledCourse } from '@/@types/enrolledCourse.interface'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import TextEllipsis from '@/components/shared/TextEllipsis'
import Progress from '@/components/ui/Progress'

interface Props {
    course: enrolledCourse
}

const EnrolledCourseCard: React.FC<Props> = ({ course }) => {
    const htmlContent = ReactHtmlParser(course.courseOverview)
    const joinedContent = htmlContent[0].props.children[0]
    const navigation = useNavigate()

    const onClick = () => {
        navigation(`/enrolled-courses/${course._id}`);
    }
    // Loading skeleton
    // if (true) {
    //   return (
    //     <div className="bg-gray-100 p-4 rounded shadow mx-2">
    //       <div className="animate-pulse flex space-x-4">
    //         <div className="flex-1 space-y-4 py-1">
    //           <div className="h-24 bg-gray-400 rounded"></div>
    //           <div className="space-y-2">
    //             <div className="flex gap-4 pb-2">
    //               <div className="h-5 bg-gray-400 rounded w-1/2"></div>
    //               <div className="h-5 bg-gray-400 rounded w-1/2"></div>
    //             </div>
    //             <div className="h-5 bg-gray-400 rounded"></div>
    //             <div className="h-5 bg-gray-400 rounded"></div>
    //             <div className="h-5 bg-gray-400 rounded"></div>
    //             <div className="h-5 bg-gray-400 rounded "></div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    return (
        <div className="relative flex w-full max-w-[26rem] mx-4 flex-col rounded-2xl  my-4 shadow-lg ">
            <div className="relative  overflow-hidden text-white shadow-lg rounded-xl">
                <div className="absolute inset-0 w-full h-full"></div>
                <img src={course.image} alt={course.title} />
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h5 className=" text-xl  font-medium">
                        {course.title}
                    </h5>
                    <p className="flex items-center gap-1.5  text-base">
                        {course.duration}
                    </p>
                </div>
                <div className="text-base  font-light">
                    <p className='py-3'>
                        <TextEllipsis text={joinedContent} maxTextCount={70} />
                    </p>
                </div>
                <div className="py-2">
                    <Progress
                            className="flex justify-start"
                            percent={30}
                        />
                </div>
            </div>
            <div className="py-3 px-6">
                <Button  variant="twoTone" className='capitalize'
                    color="blue-500" block  onClick={onClick}>
                    start Now
                </Button>
            </div>
        </div>
    )
}

export default EnrolledCourseCard
