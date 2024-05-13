import useQuery from '@/utils/hooks/useQuery'
import Container from '@/components/shared/Container'
import { Segment } from '@/components/ui'
import { HiCheckCircle,HiOutlineUser,HiClock } from 'react-icons/hi'
import { useState } from 'react'
import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import IconText from '@/components/shared/IconText'

import ProfileEdit from './profileEdit/ProfileEdit'
import ContactInfoEdit from './contantInfo/ContactInfoEdit'
import EditAddress from './addressInfo/EditAddress'
import CourseInfoTable from './courseInfo/CourseInfoTable'
import AddNoteToUser from './NotesTab/AddNoteToUser'
import OrderCardView from './orderCards/OrderCardView'
import CertificateApprovalTable from './certificateApprovals/CertificateApprovalTable'
import RegisterUserToCard from './registerUserToCard/RegisterUserToCard'

type tabSectionType =
    | 'Profile'
    | 'Contant Info'
    | 'Address'
    | 'Courses'
    | 'Note'
    | 'Card'
    | 'Certificates Approvals'
    | 'Ordred Cards'

const EditUser = () => {
    const [tabSectionType, settabSectionType] = useState('Profile')

    const query = useQuery()
    const userId = query.get('userId')

    const idUserVerified = true

    const [segmentSelections, setSegmentSelections] = useState<
        { value: tabSectionType; disabled: boolean }[]
    >([
        { value: 'Profile', disabled: false },
        { value: 'Contant Info', disabled: false },
        { value: 'Address', disabled: false },
        { value: 'Courses', disabled: false },
        { value: 'Note', disabled: false },
        { value: 'Card', disabled: false },
        { value: 'Certificates Approvals', disabled: false },
        { value: 'Ordred Cards', disabled: false },
    ])

    
    const cardFooter = (
        <div className="flex justify-end">
            <Button size="sm" variant="solid">
                update
            </Button>
        </div>
    )

    const handleTabSection = (newValue: tabSectionType) => {
        settabSectionType(newValue)
    }

    console.log(tabSectionType)

    return (
        <Container>
            <div className="flex flex-auto min-w-0 xl:flex-row flex-col gap-4">
                <div className="xl:w-[80%] w-full">
                    <div className="border">
                        <div className="bg-[#f5f5f5] p-6 ">
                            <Segment
                                defaultValue={['Profile']}
                                className="gap-4 flex-wrap"
                            >
                                {segmentSelections.map((item) => (
                                    <Segment.Item
                                        key={item.value}
                                        value={item.value}
                                        disabled={item.disabled}
                                    >
                                        {({
                                            active,
                                            value,
                                            onSegmentItemClick,
                                            disabled,
                                        }) => {
                                            return (
                                                <div
                                                    className={classNames(
                                                        'flex',
                                                        'ring-1',
                                                        'justify-between',
                                                        'border',
                                                        'rounded-md ',
                                                        'border-gray-300',
                                                        'py-2 px-2',
                                                        'cursor-pointer',
                                                        'select-none',
                                                        'w-100',
                                                        'md:w-[180px]',
                                                        active
                                                            ? 'ring-cyan-500 border-cyan-500'
                                                            : 'ring-transparent',
                                                        disabled
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : 'hover:ring-cyan-500 hover:border-cyan-500'
                                                    )}
                                                    onClick={() => {
                                                        onSegmentItemClick()
                                                        handleTabSection(item.value)
                                                    }}
                                                >
                                                    <div>
                                                        <p className="text-sm font-semibold text-black">
                                                            {value}
                                                        </p>
                                                    </div>
                                                    {active && (
                                                        <HiCheckCircle className="text-cyan-500 text-xl" />
                                                    )}
                                                </div>
                                            )
                                        }}
                                    </Segment.Item>
                                ))}
                            </Segment>
                        </div>
                        {
                            tabSectionType === 'Profile' && <ProfileEdit/>   
                        }
                        {
                            tabSectionType === 'Contant Info' && <ContactInfoEdit/>   
                        }
                        {
                            tabSectionType === 'Address' && <EditAddress/>   
                        }
                        {
                            tabSectionType === 'Courses' && <CourseInfoTable/>
                        }
                        {
                            tabSectionType === 'Note' && <AddNoteToUser/>
                        }
                        {
                            tabSectionType === 'Ordred Cards' && <OrderCardView/>
                        }
                        {
                            tabSectionType === 'Certificates Approvals' && <CertificateApprovalTable/>
                        }
                        {
                            tabSectionType === 'Card' && <RegisterUserToCard/>
                        }
                    </div>
                </div>
<<<<<<< HEAD
                <div className="bg-sky-100 xl:w-[20%] w-full h-full side-nav top-[80px] side-nav-expand overflow-y-scroll">
                        <>
                            <Card
                                header={
                                    <span className='flex flex-col justify-center items-center gap-2'>
                                        <Avatar size={120} shape="circle" icon={<HiOutlineUser />} />
                                        <span className='text-black font-bold capitalizen text-xl'>User name</span>
                                        <span className="mr-1 font-semibold  cursor-pointer ">
                                            <Tooltip title={idUserVerified ? 'Verified' :'Unverified'}>
                                                Status:
                                                <span className="text-emerald-500 text-xl ps-2 r">
                                                    <HiCheckCircle />
                                                </span>
                                            </Tooltip>
                                        </span>
                                    </span>
                                }
                                footer={cardFooter}
                            >
                                <div className=" flex flex-col  items-center">
                                    <IconText className="text-black text-sm font-semibold py-2" icon={<HiClock className="text-lg"  />}>
                                            In Progress
                                    </IconText>
                                    <IconText className="text-black text-sm font-semibold py-2" icon={<HiClock className="text-lg"  />}>
                                            In Progress
                                    </IconText>
                                    <IconText className="text-black text-sm font-semibold py-2" icon={<HiClock className="text-lg"  />}>
                                            In Progress
                                    </IconText>
                                </div>
                            </Card>
                        </>
                </div>
=======
>>>>>>> 5b8b0a1bf51cda33bc5d6b21e9ce8ad01b82ab49
            </div>
        </Container>
    )
}

export default EditUser
