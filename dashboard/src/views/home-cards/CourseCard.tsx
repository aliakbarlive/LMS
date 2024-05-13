import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CiDollar } from 'react-icons/ci'
import { MdMenuBook } from 'react-icons/md'
import { Course } from '@/@types'
import { useAppDispatch } from '../Customers/store'
import { setCourse, setMode, useAppSelector } from '@/store'
import { Button, Tooltip } from '@/components/ui'
import { HiOutlinePencil } from 'react-icons/hi'

interface IProps {
    data: Course
}
const CourseCard = (props: IProps) => {
    const navigation = useNavigate()
    const { data } = props
    const { user } = useAppSelector((state) => state.auth)
    const isCreatedByMe = user?._id === data?.createdBy?._id
    const dispatch = useAppDispatch() 
    const handleCardClick = () => {
        navigation(`/course/${data._id}`)
        dispatch(setCourse({ ...data }))
    }

    const onCourseEdit = (e: any) => {
        e.stopPropagation()
        dispatch(setCourse({ ...data }))
        dispatch(setMode('edit'))
        navigation(`/editcourse/${data._id}`)
    }
    return (
        <>
            {data && data ? (
                <div
                    key={data._id}
                    className="flex cursor-pointer flex-col border hover:shadow-2xl rounded-[9px] justify-start ms-4 w-[96%] sm:w-[45%] xl:w-[30%] 2xl:w-[22%] bg-[#F5F5F5]"
                    onClick={() => handleCardClick()}
                >
                    <div className="overflow-hidden p-[7px] h-[180px]">
                        <img
                            decoding="async"
                            className="w-full bg-cover transition duration-300 ease-in-out hover:scale-110 h-48 rounded-t-[11px] "
                            src={data.image}
                            alt="courseThambnail"
                        />
                    </div>

                    <div className="px-[10px] py-[7px] h-[178px]">
                        <div className="">
                            <h6 className="text-[18px] md:text-[14px] lg:text-[18px] font-[700] leading-[21px] text-black mb-2 ">
                                {data.title}
                            </h6>
                        </div>

                        <h4 className="flex justify-between items-center pb-[10px]">
                            <div className='text-[17px] font-[600] text-black bg-green-100 rounded-[11px] px-[7px]'>
                            {data.topic}
                            </div>
                            <h6 className="text-3xs flex flex-row w-fit  justify-start xl:justify-end items-center text-white line-clamp-1 rounded-[10px] bg-green-800 px-[7px] ">
                                <MdMenuBook className="mr-1 text-xl " />
                                <p className="line-clamp-1 ">{data.modality}</p>
                            </h6>
                        </h4>

                        <div className="flex justify-between flex-wrap xl:flex-nowrap items-center">
                            <h6 className="text-[16px] px-[6px] rounded-[10px] bg-green-800  flex flex-row justify-end xl:justify-start items-center text-white mb-2">
                                <CiDollar className="mr-[1.5px] text-[18px]" />
                                {data.price}
                            </h6>
                            <h6 className="text-[18px] font-bold text-dark-blue mb-2 text-black bg-green-100 rounded-[11px] px-[10px]">
                                {data.duration}
                            </h6>
                        </div>
                        <hr />
                        {isCreatedByMe && (
                            <Tooltip title="Edit">
                                <Button
                                    shape="circle"
                                    variant="plain"
                                    size="sm"
                                    icon={<HiOutlinePencil />}
                                    onClick={onCourseEdit}
                                />
                            </Tooltip>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default CourseCard
