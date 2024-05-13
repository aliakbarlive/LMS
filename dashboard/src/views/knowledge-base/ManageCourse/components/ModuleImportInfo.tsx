import React from 'react'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'

import CreateNewModule from './CreateNewModule'
import ImportModuleOtherCourse from './ImportModuleOtherCourse'

const ModuleImportInfo = () => {
    return (
        <div>
            <div className="flex flex-row gap-4 py-2 border-t-2 items-center justify-between w-full ">
                <>
                    <h6>Click on Add Module to create new module</h6>
                </>
                <div className='items-end'>
                       <CreateNewModule/> 
                </div>
            </div>
            <div className="flex flex-row gap-4 py-2  border-t-2  items-center justify-between w-full">
                <>
                    <h6>Click on upload Button to Upload SCORM 1.2 packages</h6>
                </>
                <div className='items-end'>
                    <Upload>
                        <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                            Upload
                        </Button>
                    </Upload>
                </div>
            </div>
            <div className="flex flex-row gap-4 py-2  border-t-2   items-center justify-between w-full">
                <>
                    <h6>Click on upload Button to Upload SCORM 2004 packages</h6>
                </>
                <div className='items-end'>
                    <Upload>
                        <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                            Upload
                        </Button>
                    </Upload>
                </div>
            </div>
            <div className="flex flex-row gap-4 py-2  border-t-2  items-center justify-between w-full">
                <>
                    <h6>Import from other courses</h6>
                </>
                <div className='items-end'>
                    <ImportModuleOtherCourse/>
                </div>
            </div>
            
        </div>
    )
}

export default ModuleImportInfo
