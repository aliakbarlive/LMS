import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { CellContext } from '@/components/shared/DataTable'
import ViewUserTable from '@/components/shared/viewusertable/ViewUserTable'
import Button from '@/components/ui/Button'
import { HiOutlinePencil,HiOutlineTrash,HiOutlineCheck } from 'react-icons/hi'


import Tooltip from "@/components/ui/Tooltip"
import Dialog from '@/components/ui/Dialog'

type certificateApprovalType = {
    id: number
    flag: boolean
    cardType: string
    certificateFront: string
    certificateBack:string
    status:string
    uploadedOn: string
    expire: string
    actions: any
}


const CertificateApprovalTable = () => {

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
    
   
    const handleAction = (cellProps: CellContext<certificateApprovalType, unknown>) => {
        console.log('Action clicked', cellProps)

    }

    const columns = useMemo<ColumnDef<certificateApprovalType>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'Flag',
                accessorKey: 'flag',
            },
            {
                header: 'Card Type',
                accessorKey: 'cardName',
            },
            {
                header: 'Certificate Front',
                accessorKey: 'certificatefront',
            },
            {
                header: 'Certificate Back',
                accessorKey: 'certificateBack',
            },
            {
                header: 'Uploaded On',
                accessorKey: 'uploadedOn',
            },
            {
                header: 'Expire',
                accessorKey: 'expire',
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => (
                    <span className='cursor-pointer rotate-180'>
                        <Tooltip title="Approve">
                            <span
                                className={`cursor-pointer p-2 hover:text-orange-500`}
                            >
                                <HiOutlineCheck size={18} onClick={() => handleAction(props)}/>
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
            'id': '1',
            'flag':'flag 1',
            'cardName': 'mail 1',
            'certificateBack': 'First Name 1',
            'status': 'Last Name 1',
            
            'actions': '1',
        },
        {
            'id': '2',
            'flag':'flag 2',
            'cardName': 'mail 2',
            'certificateBack': 'First Name 2',
            'status': 'Last Name 2 ',
           
            'actions': '1',
        },
        {
            'id': '3',
            'flag':'flag 3',
            'cardName': 'mail 3',
            'certificateBack': 'First Name 3',
            'status': 'Last Name 3',
            
            'actions': '1',
        },
        {
            'id': '4',
            'flag':'flag 4',
            'cardName': 'mail 4',
            'certificateBack': 'First Name 4',
            'status': 'Last Name 4',
            'actions': '1',
        },
    ]
  return (
    <div>
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
        <ViewUserTable showHeader={false}  title='Admins' columns={columns}  tableData={tableData} />
    </div>
  )
}

export default CertificateApprovalTable
