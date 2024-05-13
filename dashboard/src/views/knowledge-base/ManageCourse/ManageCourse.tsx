import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import AddCourse from './components/addCourse'
import AddContent from './components/addContent'
import reducer from './store'
import { injectReducer } from '@/store'



import Tabs from '@/components/ui/Tabs'
import { HiOutlinePlusCircle , HiOutlineDocumentText , HiOutlineShieldExclamation  } from 'react-icons/hi'

injectReducer('knowledgeBaseManageCourse', reducer)

const ManageCourse = () => {
    const { TabNav, TabList, TabContent } = Tabs
    return (
        <Container>
            <AdaptableCard>
                <div>
                    <Tabs defaultValue="addCourse">
                        <TabList>
                            <TabNav value="addCourse" icon={<HiOutlinePlusCircle  />}>
                                Add Course
                            </TabNav>
                            <TabNav value="content" icon={<HiOutlineDocumentText  />}>
                                Content
                            </TabNav>
                            <TabNav value="courseAuthorization" icon={<HiOutlineShieldExclamation  />}>
                                Authorization
                            </TabNav>
                        </TabList>
                        <div className="p-4">
                            <TabContent value="addCourse">
                                <AddCourse />
                            </TabContent>
                            <TabContent value="content">
                                <AddContent/>
                            </TabContent>
                            <TabContent value="courseAuthorization">
                                <p>
                                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, beatae.
                                </p>
                            </TabContent>
                        </div>
                    </Tabs>
                </div>
                
            </AdaptableCard>
        </Container>
    )
}

export default ManageCourse
