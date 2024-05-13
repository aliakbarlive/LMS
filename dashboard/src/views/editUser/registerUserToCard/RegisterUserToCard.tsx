import { useState } from 'react'
import type {
    ColumnDef,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import type { CellContext } from '@/components/shared/DataTable'
import ViewUserTable from '@/components/shared/viewusertable/ViewUserTable'
import Button from '@/components/ui/Button'
import { HiOutlinePencil,HiOutlineTrash,HiOutlineEye } from 'react-icons/hi'
import Select from '@/components/ui/Select'
import AsyncSelect from 'react-select/async'

import Tooltip from "@/components/ui/Tooltip"
import Dialog from '@/components/ui/Dialog'


type registerUserToCardType = {
    id: number
    user: string
    amount: number
    date: string
    orderStatus:boolean
    actions: any
}


const RegisterUserToCard = () => {
    const [_, setValue] = useState('')
    const [dialogIsOpen, setIsOpen] = useState<boolean>(false)

    const handleInputChange = (newValue:string) => {
        const inputValue = newValue.replace(/\W/g, '')
        setValue(inputValue)
        return inputValue
    }

    const colourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    ]

    const filterColors = (inputValue:string) => {
        return colourOptions.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        )
    }
    
    const loadOptions = (inputValue:string, callback:any) => {
        setTimeout(() => {
            callback(filterColors(inputValue))
        }, 1000)
    }


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
    
   
    const handleAction = (cellProps: CellContext<registerUserToCardType, unknown>) => {
        console.log('Action clicked', cellProps)

    }

    const columns = useMemo<ColumnDef<registerUserToCardType>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'user',
                accessorKey: 'user',
            },
            {
                header: 'Amount',
                accessorKey: 'amount',
            },
            {
                header: 'date',
                accessorKey: 'date',
            },
            {
                header: 'Order Status',
                accessorKey: 'orderStatus',
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
            'id': '1',
            'user':'user 1',
            'cardName': 'mail 1',
            'orderStatus': 'First Name 1',
            'status': 'Last Name 1',
            
            'actions': '1',
        },
        {
            'id': '2',
            'user':'user 2',
            'cardName': 'mail 2',
            'orderStatus': 'First Name 2',
            'status': 'Last Name 2 ',
           
            'actions': '1',
        },
        {
            'id': '3',
            'user':'user 3',
            'cardName': 'mail 3',
            'orderStatus': 'First Name 3',
            'status': 'Last Name 3',
            
            'actions': '1',
        },
        {
            'id': '4',
            'user':'user 4',
            'cardName': 'mail 4',
            'orderStatus': 'First Name 4',
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
            <div className='py-4 px-2'>
                <h4 className='py-2'>Register User To Card</h4>
                <div className="flex w-full gap-4">
                   <div className="w-1/2">
                   <Select
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        onInputChange={handleInputChange}
                        componentAs={AsyncSelect}
                    />
                   </div>
                    <Button
                        className="capitalize me-2"
                        variant="solid"
                        color="blue-600"
                        >
                            Register
                    </Button>
                </div>
            </div>
        <ViewUserTable showHeader={false}  title='Admins' columns={columns}  tableData={tableData}  />
    </div>
  )
}

export default RegisterUserToCard
