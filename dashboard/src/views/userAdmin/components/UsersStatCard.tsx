import { CgUserList } from 'react-icons/cg'
import { BiUpArrowAlt } from 'react-icons/bi'

const UsersStatCard = () => {
    return (
        <li className="w-full lg:w-[33vw] ">
            <a
                href="#"
                className="flex flex-row  justify-between p-5 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 "
            >
                <div className="flex gap-3 ">
                    <div className=" bg-sky-500  p-2 rounded-xl">
                        <CgUserList color="black" size={40} />
                    </div>
                    <div className="text-left">
                        <p className="pb-2 text-md">Total Customers</p>
                        <p className="text-xl">1234</p>
                    </div>
                </div>
                <div className="border bg-emerald-100  rounded-full">
                    <span className="flex px-1">
                        <BiUpArrowAlt size={20} />
                        <span>100%</span>
                    </span>
                </div>
            </a>
        </li>
    )
}

export default UsersStatCard
