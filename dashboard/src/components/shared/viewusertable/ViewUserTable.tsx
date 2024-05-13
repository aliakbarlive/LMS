import { useState, useEffect } from 'react'
import axios from 'axios'
import Input from '@/components/ui/Input'
import appConfig from '@/configs/app.config'
import Container from '@/components/shared/Container'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import type { InputHTMLAttributes } from 'react'
import type {
    ColumnDef,
    FilterFn,
    ColumnFiltersState,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import AdaptableCard from '@/components/shared/AdaptableCard'
import GetUserRole from '@/components/shared/GetUserRole'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useAppDispatch, useAppSelector, getAllUsers } from '@/store'

import UserTableViewtypp from '@/@types/UserTableViewtype'

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

interface ViewUserTableProps {
    title: string
    columns: ColumnDef<UserTableViewtypp>[]
    tableData: Array<Object>
    dialogIsOpen: boolean
    onDialogClose: any
    onDialogOk: any
    setIsOpen: any
}

type Option = {
    value: number
    label: string
}

interface DebouncedInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'prefix'
    > {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2">Search:</span>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

const ViewUserTable: React.FC<ViewUserTableProps> = ({
    title,
    columns,
    tableData,
    dialogIsOpen,
    onDialogClose,
    onDialogOk,
    setIsOpen,
}) => {
    const [status, setStatus] = useState<string>('all')
    const [loading, setLoading] = useState<boolean>(false)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const userData = useAppSelector((state) => state.userListSlice)
    const dispatch = useAppDispatch()

    const { Tr, Th, Td, THead, TBody, Sorter } = Table

    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    const totalData = userData.usersData.length

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value)

        addMeta({
            itemRank,
        })

        return itemRank.passed
    }

    // const allUsers = async () => {
    //     const baseUrl = `${appConfig.baseUrl}/${appConfig.apiPrefix}`
    //     const res = await axios.get(`${baseUrl}/auth/users`);
    //     console.log(res);
    //     setUserData(res.data.users);
    // }
    

    useEffect(() => {
        //   allUsers();
        dispatch(getAllUsers())
    }, [])

    const [data, setData] = useState(userData?.usersData)
    // console.log( "?>>>>>>>>>>>>>>>>>>>>>>>",userData)
    useEffect(() => {
        setData(userData.usersData)
    }, [userData.usersData.length])

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    return (
        <Container>
            <AdaptableCard>
                <>
                    <Dialog
                        isOpen={dialogIsOpen}
                        bodyOpenClassName="overflow-hidden"
                        onClose={onDialogClose}
                        onRequestClose={onDialogClose}
                    >
                        <h5 className="mb-4">
                            Would you like to permanently delete this user ?
                        </h5>
                        <p>
                            Once deleted, this user will no longer be
                            accessible.
                        </p>
                        <div className="text-right mt-6">
                            <Button
                                className="ltr:mr-2 rtl:ml-2 capitalize"
                                variant="twoTone"
                                onClick={onDialogClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="capitalize"
                                variant="solid"
                                onClick={onDialogOk}
                                color="red-600"
                            >
                                Permanently delete
                            </Button>
                        </div>
                    </Dialog>
                </>
                <>
                    {/* {
                          && (
                            <div className="flex items-center gap-4">
                        <h2 className="inline dark:text-white">{title}</h2>
                        <GetUserRole />
                    </div>
                         )
                    } */}
                    <div className="flex items-center justify-between my-4">
                        <div style={{ minWidth: 130 }}>
                            <Select<Option>
                                size="sm"
                                isSearchable={false}
                                value={pageSizeOption.filter(
                                    (option) =>
                                        option.value ===
                                        table.getState().pagination.pageSize
                                )}
                                options={pageSizeOption}
                                onChange={(option) =>
                                    onSelectChange(option?.value)
                                }
                            />
                        </div>
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            className="p-2 font-lg shadow border border-block"
                            placeholder="Search Editor..."
                            onChange={(value) => setGlobalFilter(String(value))}
                        />
                    </div>
                    <Table>
                        <THead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <Th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                style={{
                                                    position: 'relative',
                                                    width: header.getSize(),
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        {...{
                                                            className:
                                                                header.column.getCanSort()
                                                                    ? `table-resizer flex items-center justify-center cursor-all-scroll cursor-pointer w-full   ${
                                                                          header.column.getIsResizing()
                                                                              ? 'isResizing'
                                                                              : ''
                                                                      }`
                                                                    : '',

                                                            onClick:
                                                                header.column.getToggleSortingHandler(),
                                                        }}
                                                        onMouseDown={header.getResizeHandler()}
                                                        onTouchStart={header.getResizeHandler()}
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                        {
                                                            <Sorter
                                                                sort={header.column.getIsSorted()}
                                                            />
                                                        }
                                                    </div>
                                                )}
                                            </Th>
                                        )
                                    })}
                                </Tr>
                            ))}
                        </THead>
                        <TBody>
                            {table.getRowModel().rows.map((row, index) => {
                                const isOdd = index % 2 === 0
                                const rowClassName = isOdd
                                    ? 'text-center bg-[#f5f5f5]'
                                    : 'text-center'
                                return (
                                    <Tr key={row.id} className={rowClassName}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td
                                                    key={cell.id}
                                                    style={{
                                                        width: cell.column.getSize(),
                                                    }}
                                                >
                                                    {cell?.column?.columnDef
                                                        .accessorKey ===
                                                    'userStatus'
                                                        ? row.original
                                                              .userStatus
                                                        : flexRender(
                                                              cell.column
                                                                  .columnDef
                                                                  .cell,
                                                              cell.getContext()
                                                          )}
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })}
                        </TBody>
                    </Table>
                    {/* <h1>{userData[1].firstName}</h1> */}
                    <div className="flex items-center justify-between mt-4">
                        <Pagination
                            pageSize={table.getState().pagination.pageSize}
                            currentPage={
                                table.getState().pagination.pageIndex + 1
                            }
                            total={totalData}
                            onChange={onPaginationChange}
                        />
                    </div>
                </>
            </AdaptableCard>
        </Container>
    )
}

export default ViewUserTable