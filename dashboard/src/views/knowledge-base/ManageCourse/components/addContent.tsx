import Tabs from '@/components/ui/Tabs'
import { HiOutlineHome, HiOutlineUser } from 'react-icons/hi'
import AddCourseModule from './AddCourseModule'
import AddCourseQuiz from './AddCourseQuiz'

const AddContent = () => {

    const { TabNav, TabList, TabContent } = Tabs

    return (
        <>
        <Tabs defaultValue="addCourseModule" variant="pill" className='flex-row flex bg-[#f9f9f9]'>
            <TabList className='flex-col shrink-0 items-start pt-2 '>
                <TabNav value="addCourseModule" icon={<HiOutlineHome />}>
                    Add Module
                </TabNav>
                <TabNav value="addCourseQuiz" icon={<HiOutlineUser />}>
                    Add Quiz
                </TabNav>
            </TabList>
            <div className="p-4 pt-0 w-full">
                <TabContent value="addCourseModule">
                   <AddCourseModule/>
                </TabContent>
                <TabContent value="addCourseQuiz">
                    <AddCourseQuiz/>
                </TabContent>
                
            </div>
        </Tabs>
    </>
    )
}

export default AddContent ;