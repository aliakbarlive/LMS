import React from 'react'
import { MdEdit } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const InvoiceRow = () => {
    const navigate =useNavigate();

    const handleInvoicAction = ()=>{
        navigate('/home')
    }
    return (
        <tr className="bg-white border-b cursor-pointer hover:bg-gray-100 text-center">
            <td className="px-6 py-4">05/11/21</td>
            <td className="px-6 py-4">012345</td>
            <td scope="row" className="px-6 py-4  font-normal whitespace-nowrap">
                <div className="flex gap-3 items-center justify-center">
                    <img
                        src="https://img.freepik.com/premium-vector/people-profile-graphic_24911-21373.jpg"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className='flex flex-col text-sm text-start '>
                     <span className=''>Lorem, ipsum.</span>
                     <span>test@gmail.com</span>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                {/* change the bg-class depending upon invoice status bg-red-500 bg-yellow-500  */}
                <span className={`text-white  ${'bg-green-500'}  rounded-lg px-2 py-1`}>Paid</span>
                
            </td>
            <td className="px-6 py-4 text-right">
                <div className="font-medium text-blue-600 dark:text-blue-500 ">
                    <div className='flex justify-center gap-2 items-center'>
                        <MdEdit size={20} color='black' onClick={handleInvoicAction} />
                        <GrFormView size={30} color='black'/>
                        <MdDelete size={20} color='black'/>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default InvoiceRow
