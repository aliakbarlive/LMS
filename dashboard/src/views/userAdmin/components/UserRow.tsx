import React from 'react'
import { CgUserList } from 'react-icons/cg'
const UserRow = () => {
  return (
    <tr className="bg-white border-b cursor-pointer hover:bg-gray-100 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <span className='flex gap-2 items-center'> <CgUserList size={30}/> Lorem </span>
                </th>
                <td className="px-6 py-4">
                    test@gmail.com
                </td>
                <td className="px-6 py-4">
                        Active
                </td>
                <td className="px-6 py-4">
                    05/11/21
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 ">Edit</a>
                </td>
            </tr>
  )
}

export default UserRow