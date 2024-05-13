import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Container from '@/components/shared/Container'
import Tag from '@/components/ui/Tag'
import { useMemo } from 'react'
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
import type { CellContext } from '@/components/shared/DataTable'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import { HiOutlineCog, HiOutlinePencil } from 'react-icons/hi'
import { MdDone, MdDelete } from 'react-icons/md'
import Dropdown from '@/components/ui/Dropdown'
import { BsThreeDotsVertical } from 'react-icons/bs'

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

type Person = {
    id: number
    mail: string
    userName: string
    signUpDate: string
    userStatus: any
    actions: any
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

const CourseTasks: React.FC = () => {
    const [status, setStatus] = useState<string>('all')
    const [loading, setLoading] = useState<boolean>(false)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    const { Tr, Th, Td, THead, TBody, Sorter } = Table

    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    const tableData = (): Person[] => {
        const arr = []
        for (let i = 0; i < 3; i++) {
            arr.push({
                id: i,
                userName: `userName${i}`,
                mail: `mail${i}`,
                signUpDate: `Sign Up Date ${i}`,
                userStatus: i % 2 === 0 ? true : false,
                actions: i,
            })
        }
        return arr
    }
    const totalData = tableData().length

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        // Rank the item
        const itemRank = rankItem(row.getValue(columnId), value)
        // Store the itemRank info
        addMeta({
            itemRank,
        })
        // Return if the item should be filtered in/out
        return itemRank.passed
    }

    const handleAction = (cellProps: CellContext<Person, unknown>) => {
        console.log('Action clicked', cellProps)
    }

    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            {
                header: 'Tasks',
                accessorKey: 'task',
            },
            // {
            //     header: 'Location',
            //     accessorKey: 'location',
            // },
            // {
            //     header: 'Date',
            //     accessorKey: 'date',
            // },
            // {
            //     header: 'Start Time',
            //     accessorKey: 'startTime',
            // },
            // {
            //     header: 'End Time',
            //     accessorKey: 'endTime',
            // },
            // {
            //     header: 'Total Student',
            //     accessorKey: 'totalStudent',
            // },
            // {
            //     header: 'Type',
            //     accessorKey: 'type',
            // },
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => {
                    const Toggle = (
                        <span className="cursor-pointer rotate-180">
                            <BsThreeDotsVertical size={20} />
                        </span>
                    )
                    return (
                        <>
                            <Dropdown
                                placement="bottom-center"
                                renderTitle={Toggle}
                            >
                                <Dropdown.Item eventKey="a">
                                    <Button
                                        size="xs"
                                        onClick={() => handleAction(props)}
                                        className="capitalize mr-2 mb-2 w-full p-0"
                                        variant="solid"
                                        color="blue-600"
                                        icon={<HiOutlinePencil size={15} />}
                                    >
                                        <span>Edit</span>
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="b">
                                    <Button
                                        size="xs"
                                        onClick={() => {
                                            handleAction(props)
                                            openDialog()
                                        }}
                                        className="mr-2 mb-2 capitalize w-full"
                                        icon={<MdDelete size={15} />}
                                        variant="solid"
                                        color="red-600"
                                    >
                                        <span>Delete</span>
                                    </Button>
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="c">
                                    <Button
                                        size="xs"
                                        onClick={() => handleAction(props)}
                                        className="capitalize mr-2 mb-2 w-full"
                                        variant="solid"
                                        color="green-600"
                                        icon={<MdDone />}
                                    >
                                        <span>approval</span>
                                    </Button>
                                </Dropdown.Item>
                            </Dropdown>
                        </>
                    )
                },
            },
        ],
        []
    )

    const [data] = useState(() => tableData())
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
                     <div className="flex items-center justify-between  bg-[#F5F5F5]"> {/* my-4 */}
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
                            placeholder="Search User..."
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
                                                                    ? `table-resizer flex items-center justify-center cursor-all-scroll cursor-pointer  w-full   ${
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
                                                    'userStatus' ? (
                                                        row.original
                                                            .userStatus ? (
                                                            <Tag className=" capitalize text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 border-0">
                                                                Pending
                                                            </Tag>
                                                        ) : (
                                                            <Tag className="bg-emerald-100 capitalize text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 ">
                                                                approved
                                                            </Tag>
                                                        )
                                                    ) : (
                                                        flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    )}
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })}
                        </TBody>
                    </Table>
                    <div className="flex items-center justify-between mt-4  pb-[10px]">
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

export default CourseTasks
