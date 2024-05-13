import React from 'react'
import { useState } from 'react'
import Button from '@/components/ui/Button'

import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'

import ImportModuleOtherCourseForm from '@/components/shared/ImportModuleOtherCourseForm'

const ImportModuleOtherCourse = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

  return (
        <>
            <Button variant="solid" onClick={() => openDialog()}>
                Import 
            </Button>
            <Dialog
                isOpen={dialogIsOpen}
                height='85vh'
                contentClassName="pb-0 px-0"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col  justify-between h-full p-4">
                    <h5 className="mb-4 ps-4">Import Module from other course</h5>
                    <div className="h-full overflow-y-auto">
                       <ImportModuleOtherCourseForm onDialogClose={onDialogClose}/>
                    </div>
                </div>
                </div>
            </Dialog>
        </>
  )
}

export default ImportModuleOtherCourse