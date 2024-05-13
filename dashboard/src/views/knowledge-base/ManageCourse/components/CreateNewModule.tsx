import React from 'react'
import { useState } from 'react'
import Button from '@/components/ui/Button'

import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'

import CreateNewModuleForm from '@/components/shared/CreateNewModuleForm'

const CreateNewModule = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    // const onDialogOk = (e: MouseEvent) => {
    //     console.log('onDialogOk', e)
    //     setIsOpen(false)
    // }
  return (
        <>
            <Button variant="solid" onClick={() => openDialog()}>
                Create New 
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
                    <h5 className="mb-4 ps-4">Create New Module</h5>
                    <div className="h-full overflow-y-auto">
                       <CreateNewModuleForm onDialogClose={onDialogClose}/>
                    </div>
                </div>
                {/* <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg ">
                     <Button
                        className="ltr:mr-2 rtl:ml-2"
                        onClick={onDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onDialogOk}  type="submit">
                        Add
                    </Button> 
                </div> */}
                </div>
            </Dialog>
        </>
  )
}

export default CreateNewModule