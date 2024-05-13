import React from 'react'
import { MdOutlineCopyright } from 'react-icons/md'
import { GrDocumentDownload } from 'react-icons/gr'
import { Button } from '@/components/ui'
import { IoMdPrint } from 'react-icons/io'

import Table from '@/components/ui/Table'


interface InvoiceBodyProps {
    invoiceId:string
}
const InvoiceBody:React.FC<InvoiceBodyProps> = ({invoiceId}) => {

    console.log(invoiceId)

    const { Tr, Th, Td, THead, TBody } = Table

    return (
        <>
            <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-800">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">
                            HSMA
                        </h2>
                        <address className="mt-4 not-italic text-gray-800 dark:text-gray-200 w-1/2">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident iusto placeat dolore eaque! Qui, fugiat.
                        </address>
                    </div>
                    <div className="w-1/2 text-end">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                            Invoice ID
                        </h2>
                        <span className="mt-1 block text-gray-500">12345</span>
                    </div>
                </div>
                
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Bill to:
                        </h3>
                        <h3 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-200">
                            user name
                        </h3>
                        <address className="mt-2 not-italic text-gray-500">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Cumque.
                        </address>
                    </div>

                    <div className="sm:text-end space-y-2">
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                    Invoice date:
                                </dt>
                                <dd className="col-span-2 text-gray-500">
                                    01/01/2024
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                        <Table>
                            <THead>
                                <Tr>
                                    <Th>Item</Th>
                                    <Th>Qty</Th>
                                    <Th>Rate</Th>
                                    <Th>Amount</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                <Tr>
                                    <Td>Lorem, ipsum.</Td>
                                    <Td>4</Td>
                                    <Td>$10</Td>
                                    <Td>$40</Td>
                                </Tr>
                                <Tr>
                                    <Td>Lorem, ipsum.</Td>
                                    <Td>4</Td>
                                    <Td>$10</Td>
                                    <Td>$40</Td>
                                </Tr>
                                <Tr>
                                    <Td>Lorem, ipsum.</Td>
                                    <Td>4</Td>
                                    <Td>$10</Td>
                                    <Td>$40</Td>
                                </Tr>
                            </TBody>
                        </Table>
                    </div>
                </div>
                <div className="mt-8 flex sm:justify-end">
                    <div className="w-full max-w-2xl sm:text-end space-y-2">
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                    Subtotal:
                                </dt>
                                <dd className="col-span-2 text-gray-500">
                                    $120.00
                                </dd>
                            </dl>
                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                    Tax:
                                </dt>
                                <dd className="col-span-2 text-gray-500">
                                    $10.00
                                </dd>
                            </dl>

                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                    Total:
                                </dt>
                                <dd className="col-span-2 text-gray-500">
                                    $130.00
                                </dd>
                            </dl>

                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                    Amount paid:
                                </dt>
                                <dd className="col-span-2 text-gray-500">
                                    $130.00
                                </dd>
                            </dl>

                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                    Due balance:
                                </dt>
                                <dd className="col-span-2 text-gray-500">
                                    $0.00
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="mt-8 sm:mt-12">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Thank you!
                    </h4>
                    <p className="text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Cum fugit quam vel recusandae esse natus?
                    </p>
                    <div className="mt-2">
                        <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                            test@gmail.com
                        </p>
                        <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                            012-345-6789
                        </p>
                    </div>
                </div>
                <p className="mt-5 text-sm text-gray-500 uppercase flex gap-1">
                    <MdOutlineCopyright size={20} /> year hsma.
                </p>
            </div>
            <div className="mt-6 flex justify-end gap-x-3">
                <Button variant="twoTone" icon={<GrDocumentDownload size={20} />}>
                    <span>Invoice PDF</span>
                </Button>
                <Button variant="solid" icon={<IoMdPrint size={20} />}>
                    <span>Print</span>
                </Button>
            </div>
        </>
    )
}

export default InvoiceBody
