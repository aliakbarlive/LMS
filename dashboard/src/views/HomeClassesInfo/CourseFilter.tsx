import React, { useState, useEffect, useRef } from 'react'
import { InputHTMLAttributes } from 'react'
import { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import {
    CourseState,
    getAllCourses,
    useAppDispatch,
    useAppSelector,
} from '@/store'
import { Course as ICourse } from '@/@types'
import Container from '@/components/shared/Container'
import Table from '@/components/ui/Table'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useParams } from 'react-router-dom'

type Person = {
    topic: string
    postTitle: string
    objectivesTitle: string
    price: number
    status: string

    // title: string;
    // id: string;
    // courseOverview: string;
    // createdAt: string;
    // createdBy: string;
    // duration: string;
    // feedbackCount: number;
    // image: string;
    // isCreatedByMe: boolean;
    // isPublished: boolean;
    // modality: string;

    // updatedAt: string;
    // videoUrl: string;
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

const CourseFilter: React.FC = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [dialogIsOpen, setIsOpen] = useState(false)
    const isRendering = useRef(false)
    const { courseId } = useParams<{ courseId: string }>()

    const { allCourseList }: CourseState = useAppSelector(
        (state) => state.courseSlice
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (allCourseList.length === 0 && !isRendering.current) {
            dispatch(getAllCourses())
            isRendering.current = true
        }
    }, [allCourseList])

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const onDialogOk = () => {
        setIsOpen(false)
    }

    const { Tr, Th, Td, THead, TBody, Sorter } = Table
    console.log('====================================')
    console.log(allCourseList)
    console.log('====================================')
    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    const tableData = (): Person[] => {
        return allCourseList.map((course) => ({
            topic: course.topic,
            postTitle: course.postTitle,
            objectivesTitle: course.objectivesTitle,
            price: course.price,
            status: course.status,
            // title: course.title,
            // id: course._id,
            // courseOverview: course.courseOverview,
            // createdAt: course.createdAt,
            // createdBy: course.createdBy.email,
            // duration: course.duration,
            // feedbackCount: course.feedback.length,
            // image: course.image,
            // isCreatedByMe: course.isCreatedByMe,
            // isPublished: course.isPublished,
            // modality: course.modality,

            // updatedAt: course.updatedAt,
            // videoUrl: course.videoUrl,
        }))
    }

    const totalData = tableData().length

    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value)
        addMeta({
            itemRank,
        })
        return itemRank.passed
    }

    const handleAction = () => {
        console.log('Action clicked')
    }

    const columns = React.useMemo<ColumnDef<Person>[]>(
        () => [
            { header: 'Topic', accessorKey: 'topic' },
            { header: 'Post Title', accessorKey: 'postTitle' },
            { header: 'Objectives Title', accessorKey: 'objectivesTitle' },
            { header: 'Price', accessorKey: 'price' },
            { header: 'Status', accessorKey: 'status' },
        ],
        []
    )

    const [data, setData] = useState(() => tableData())

    useEffect(() => {
        setData(tableData())
    }, [allCourseList])

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
    })

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    return (
        <Container>
            <Dialog
                isOpen={dialogIsOpen}
                bodyOpenClassName="overflow-hidden"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">
                    Would you like to permanently delete this user ?
                </h5>
                <p>Once deleted, this user will no longer be accessible.</p>
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
            <div className="flex items-center justify-between  bg-[#F5F5F5]">
                <div style={{ minWidth: 130 }} className="pb-[15px]">
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
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    style={{
                                        position: 'relative',
                                        width: header.getSize(),
                                        textAlign: 'center',
                                        // backgroundColor:'red'
                                    }}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className: `${header.column.getCanSort()
                                                    ? `table-resizer flex items-center justify-center cursor-all-scroll cursor-pointer  w-full   ${header.column.getIsResizing()
                                                        ? 'isResizing'
                                                        : ''
                                                    }`
                                                    : ''
                                                    }`,
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            <Sorter
                                                sort={header.column.getIsSorted()}
                                            />
                                        </div>
                                    )}
                                </Th>
                            ))}
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
                                                textAlign: 'center', // Center the content
                                            }}
                                        >
                                            {cell?.column?.columnDef
                                                .accessorKey === 'userStatus' ? (
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
        </Container>
    )
}

export default CourseFilter
