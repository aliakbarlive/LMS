import React from 'react'
import UsersStatCard from './components/usersStatCard'
import ViewUserList from './components/ViewUserList'

type Props = {}

const UserList = (props: Props) => {
    return (
        <div className="">
            <ul className=" text-sm pb-8 flex gap-10 font-medium text-center text-gray-500 rounded-lg flex-col lg:flex-row ">
                <UsersStatCard />
                <UsersStatCard />
                <UsersStatCard />
            </ul>
            <ViewUserList/>
        </div>
    )
}

export default UserList
