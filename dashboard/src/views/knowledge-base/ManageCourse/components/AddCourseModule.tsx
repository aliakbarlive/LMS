import React from 'react'
import Tabs from '@/components/ui/Tabs'
import CreateLesson from './CreateLesson'

import ModuleImportInfo from './ModuleImportInfo'

const AddCourseModule = () => {
    const { TabNav, TabList, TabContent } = Tabs
  return (
    <>
            <Tabs defaultValue="moduleImportInfo" className='p-0'>
                <TabList>
                    <TabNav value="moduleImportInfo">Module Import / Info</TabNav>
                    <TabNav value="createLesson">Create Lesson</TabNav>
                </TabList>
                <div className="p-4 ">
                    <TabContent value="moduleImportInfo">
                        <ModuleImportInfo/>
                    </TabContent>
                    <TabContent value="createLesson">
                       <CreateLesson/>
                    </TabContent>
                </div>
            </Tabs>
        </>
  )
}

export default AddCourseModule