import { useState } from 'react'
import type {
    ColumnDef,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import type { CellContext } from '@/components/shared/DataTable'
import ViewUserTable from '@/components/shared/viewusertable/ViewUserTable'
import Button from '@/components/ui/Button'
import { HiOutlinePencil,HiOutlineEye ,HiOutlineTrash} from 'react-icons/hi'
import Tooltip  from '@/components/ui/Tooltip'

import Dialog from '@/components/ui/Dialog'

type ViewCourseType = {
  courseId: number
  courseName: string
  firstName: string
  classDate: string
  certificate:string
  completionDate:string
  actions: any
  time:string

}
const CourseInfoTable = () => {

    const [dialogIsOpen, setIsOpen] = useState<boolean>(false)

    const openDialog = () => {
        setIsOpen(true)
        console.log("Dialogopen")
    }

    const onDialogClose = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }
    
   
    const handleAction = (cellProps: CellContext<ViewCourseType, unknown>) => {
        console.log('Action clicked', cellProps)

    }

    const columns = useMemo<ColumnDef<ViewCourseType>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'courseId',
            },
            {
                header: 'Course',
                accessorKey: 'courseName',
            },
            {
                header: 'First Name',
                accessorKey: 'firstName',
            },
            {
                header: 'Class Date',
                accessorKey: 'classDate',
            },
            {
                header: 'Completion Date',
                accessorKey: 'completionDate',
            },
            {
                header: 'Time ',
                accessorKey: 'time',
            },
            {
              header: 'Certificate ',
              accessorKey: 'certificate',
            },
            
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => (
                    <span className='cursor-pointer rotate-180'>
                        <Tooltip title="View">
                            <span
                                className={`cursor-pointer p-2 hover:text-orange-500`}
                            >
                                <HiOutlineEye onClick={() => handleAction(props)}/>
                            </span>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <span
                                className={`cursor-pointer p-2 hover:text-blue-400`}
                            >
                                <HiOutlinePencil   onClick={() => {
                                            handleAction(props)
                                            openDialog()
                                        }}/>
                            </span>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <span
                                className="cursor-pointer p-2 hover:text-red-600"
                            // onClick={onDelete}
                            >
                                <HiOutlineTrash />
                            </span>
                        </Tooltip>
                    </span>

                    
                )
            },
        ],
        []
    )

    const tableData=[
        {
            'editorId': '1',
            'userName':'userName 1',
            'editormail': 'mail 1',
            'firstName': 'First Name 1',
            'lastName': 'Last Name 1',
            'signUpDate': 'Sign Up Date 1',
            'userStatus':true ,
            'actions': '1',
        },
        {
            'editorId': '2',
            'userName':'userName 2',
            'editormail': 'mail 2',
            'firstName': 'First Name 2',
            'lastName': 'Last Name 2 ',
            'signUpDate': 'Sign Up Date 2',
            'userStatus':true,
            'actions': '1',
        },
        {
            'editorId': '3',
            'userName':'userName 3',
            'editormail': 'mail 3',
            'firstName': 'First Name 3',
            'lastName': 'Last Name 3',
            'signUpDate': 'Sign Up Date 3',
            'userStatus':false ,
            'actions': '1',
        },
        {
            'editorId': '4',
            'userName':'userName 4',
            'editormail': 'mail 4',
            'firstName': 'First Name 4',
            'lastName': 'Last Name 4',
            'signUpDate': 'Sign Up Date 4',
            'userStatus':true ,
            'actions': '1',
        },
    ]
  return (
    <>
        <>
                <Dialog
                    isOpen={dialogIsOpen}
                    bodyOpenClassName="overflow-hidden"
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <h5 className="mb-4">
                        Would you like to permanently delete this item ?
                    </h5>
                    <p>Once deleted, this item will no longer be accessible.</p>
                    <div className="text-right mt-6">
                        <Button
                            className="capitalize me-2"
                            variant="solid"
                            onClick={onDialogOk}
                            color="red-600"
                        >
                            Permanently delete
                        </Button>
                        <Button
                            className="ltr:mr-2 rtl:ml-2 capitalize"
                            variant="twoTone"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </Dialog>
            </>
        <ViewUserTable   title='Managers' columns={columns}  tableData={tableData}  />
    </>
  )
}

export default CourseInfoTable

