import { useState, useMemo } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { CellContext } from '@/components/shared/DataTable'
import Tooltip from '@/components/ui/Tooltip'
import { HiOutlineEye, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'

type Person = {
    id: number
    content: string
}

type Option = {
    value: number
    label: string
}

const { Tr, Th, Td, THead, TBody } = Table

const tableData = (): Person[] => {
    const arr = []
    for (let i = 1; i < 5; i++) {
        arr.push({
            id: i,
            content: 'content',
        })
    }
    return arr
}

const totalData = tableData().length

const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]

const handleAction = (cellProps: CellContext<Person, unknown>) => {
    const userData = cellProps?.row?.original || null
    if (userData) {
        // navigate(`/create-user?userId=${userId}`);
    }
}

const ViewNotes = () => {
    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
            },
            {
                header: 'Content',
                accessorKey: 'content',
            },
            {
                header: 'Action',
                accessorKey: 'action',
                cell: (props) => (
                    <span className="cursor-pointer rotate-180">
                        <Tooltip title="View">
                            <span
                                className={`cursor-pointer p-2 hover:text-orange-500`}
                            >
                                <HiOutlineEye
                                    onClick={() => handleAction(props)}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <span
                                className={`cursor-pointer p-2 hover:text-blue-400`}
                            >
                                <HiOutlinePencil
                                    onClick={() => {
                                        handleAction(props)
                                    }}
                                />
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
                ),
            },
        ],
        []
    )

    const [data] = useState(() => tableData())

    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    return (
        <div>
            <h3 className='py-2'>Notes List</h3>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
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
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
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
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewNotes
