import { useState } from 'react'
import type {
    ColumnDef,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import type { CellContext } from '@/components/shared/DataTable'
import ViewUserTable from '@/components/shared/viewusertable/ViewUserTable'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import axios from 'axios'
import appConfig from '@/configs/app.config'
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from '@/components/ui/Dropdown'
import Button from '@/components/ui/Button'
import { HiOutlinePencil } from 'react-icons/hi'
import { MdDone, MdDelete } from 'react-icons/md'
import UserTableViewtypp from "@/@types/UserTableViewtype"
import Dialog from '@/components/ui/Dialog'
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi"
import { Notification, Tooltip, toast } from "@/components/ui"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const ViewNormalUser = () => {

    const [dialogIsOpen, setIsOpen] = useState<boolean>(false)
    const [usersId, setUsersId] = useState<any>('');
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const openDialog = () => {
        setIsOpen(true);
        // console.log("Dialogopen")
    }

    const onDialogClose = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }


    const handleAction = (cellProps: CellContext<UserTableViewtypp, unknown>) => {
        const userData = cellProps?.row?.original || null
        const userId = cellProps?.row?.original?._id || null
        // console.log("UID", userId)
        console.log("UD", userData)
        if (userData && userId) {
            // navigate(`/create-user?userId=${userId}`);
            navigate(`/user/upDateProfile/?userId=${userId}`, { state: userData});

        }
    }
    const handleActionP = (cellProps: CellContext<UserTableViewtypp, unknown>) => {
        const userData = cellProps?.row?.original || null
        const userId = cellProps?.row?.original?._id || null
        if (userData && userId) {
            // navigate(`/create-user?userId=${userId}`);
            navigate(`/user/profile/?userId=${userId}`, { state: userData });

        }
    }

    const deleteReq = async(
            method: 'delete',
            url: string,
            accessToken:  string,
        )=>{
            try {
                const response = await axios({
                    method,
                    url,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${accessToken}`,
                    },
                })
                return response.data
              } catch (error) {
                console.log(error);
              }
        }
    
    const handleActionD = (cellProps: CellContext<UserTableViewtypp, unknown>) => {
        const userData = cellProps?.row?.original || null
        const userId = cellProps?.row?.original?._id || null
        setUsersId(userId);       
    }


    const onDialogOk = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {

        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)
        const accessToken = (persistData as any).auth.session.token
        const baseUrl = `${appConfig.baseUrl}/${appConfig.apiPrefix}`
        const response = await deleteReq(
            'delete',
            `${baseUrl}/auth/delete/${usersId}`,
            accessToken,
        )
        setIsOpen(false)
        if(response.status){
            toast.push(
                <Notification title='User deleted successfully' type='success'/>,
                {
                    placement: "top-center"
                }
            )

            // const { firstName } = response.
            
        }
    }


    const columns = useMemo<ColumnDef<UserTableViewtypp>[]>(
        () => [
            {
                header: 'User Name',
                accessorKey: 'userName',
            },
            {
                header: 'First Name',
                accessorKey: 'firstName',
            },
            {
                header: 'Last Name',
                accessorKey: 'lastName',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Role',
                accessorKey: 'role',
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
                                <HiOutlineEye onClick={() => handleActionP(props)} />
                            </span>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <span
                                className={`cursor-pointer p-2 hover:text-blue-400`}
                            >
                                <HiOutlinePencil onClick={() => {
                                    handleAction(props)
                                    // openDialog()
                                }} />
                            </span>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <span
                                className="cursor-pointer p-2 hover:text-red-600"
                            // onClick={onDelete}
                            >
                                <HiOutlineTrash  onClick={() => {
                                        handleActionD(props)
                                        openDialog()
                                    }} />
                            </span>
                        </Tooltip>
                    </span>

                    // return (
                    // <>
                    //     <Dropdown placement="bottom-end" renderTitle={Toggle}>
                    //         <Dropdown.Item eventKey="a" >
                    //             <Button
                    //                 size="xs"
                    //                 onClick={() => handleAction(props)}
                    //                 className="capitalize mr-2 mb-2 w-full p-0"
                    //                 variant="solid"
                    //                 color="blue-600"
                    //                 icon={<HiOutlinePencil size={15} />}

                    //             >
                    //                 <span>Edit</span>
                    //             </Button>
                    //         </Dropdown.Item>
                    //         <Dropdown.Item eventKey="b">
                    //             <Button
                    //                 size="xs"
                    //                 onClick={() => {
                    //                     handleAction(props)
                    //                     openDialog()
                    //                 }}
                    //                 className="mr-2 mb-2 capitalize w-full"
                    //                 icon={<MdDelete size={15} />}
                    //                 variant="solid"
                    //                 color="red-600"
                    //             >
                    //                 <span>Delete</span>
                    //             </Button>
                    //         </Dropdown.Item>
                    //         <Dropdown.Item eventKey="c">
                    //             <Button
                    //                 size="xs"
                    //                 onClick={() => handleAction(props)}
                    //                 className="capitalize mr-2 mb-2 w-full"
                    //                 variant="solid"
                    //                 color="green-600"
                    //                 icon={<MdDone />}
                    //             >
                    //                 <span>approval</span>
                    //             </Button>
                    //         </Dropdown.Item>
                    //     </Dropdown>
                    // </>
                    // )
                )
            },
        ],
        []
    )

    const tableData = [
        {
            'editorId': '1',
            'userName': 'userName 1',
            'editormail': 'mail 1',
            'firstName': 'First Name 1',
            'lastName': 'Last Name 1',
            'signUpDate': 'Sign Up Date 1',
            'userStatus': true,
            'actions': '1',
        },
        {
            'editorId': '2',
            'userName': 'userName 2',
            'editormail': 'mail 2',
            'firstName': 'First Name 2',
            'lastName': 'Last Name 2 ',
            'signUpDate': 'Sign Up Date 2',
            'userStatus': false,
            'actions': '1',
        },
        {
            'editorId': '3',
            'userName': 'userName 3',
            'editormail': 'mail 3',
            'firstName': 'First Name 3',
            'lastName': 'Last Name 3',
            'signUpDate': 'Sign Up Date 3',
            'userStatus': false,
            'actions': '1',
        },
        {
            'editorId': '4',
            'userName': 'userName 4',
            'editormail': 'mail 4',
            'firstName': 'First Name 4',
            'lastName': 'Last Name 4',
            'signUpDate': 'Sign Up Date 4',
            'userStatus': true,
            'actions': '1',
        },
    ]
    return (
        <div>
            <>
                {/* <Dialog
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
                </Dialog> */}
            </>
    
            <ViewUserTable showHeader={true} title='Users' columns={columns} tableData={tableData} dialogIsOpen={dialogIsOpen} onDialogClose={onDialogClose} onDialogOk={onDialogOk} setIsOpen={setIsOpen} />
        </div>
    )
}

export default ViewNormalUser

