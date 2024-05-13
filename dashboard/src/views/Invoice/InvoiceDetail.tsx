import axios from 'axios'
import { useEffect, useState } from 'react'
import useQuery from '@/utils/hooks/useQuery'
import InvoiceBody from './components/InvoiceBody'

import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'

const InvoiceDetail = () => {
    const query = useQuery()
    const id = query.get('id') as string
    console.log(id, 'this is id fron invoice details')

    return (
        <Container>
            <AdaptableCard>
                <div className="bg-gray-50 dark:bg-slate-900">
                    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
                        <div className="sm:w-11/12 lg:w-3/4 mx-auto">

                            <InvoiceBody invoiceId={id}/>

                        </div>
                    </div>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default InvoiceDetail
