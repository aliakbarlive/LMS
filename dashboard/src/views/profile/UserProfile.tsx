import React from 'react'
import UpdateProfileForm from './components/UpdateProfileForm'
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    const location = useLocation();
    const user: any = location.state
    console.log("This data", user);

  return (
    <div>
        <div className='bg-[#F5F5F5] py-[17px] w-[87%] text-center rounded-[10px]'>
            <h2 className='text-[#444444]'>User Details</h2>   
        </div>
    <div className='flex flex-col md:flex-row gap-[10px] mt-[15px]'>
        <div className='bg-[#F5F5F5] py-[40px] px-[20px] rounded-[10px] flex-[2]  border-[1px] flex flex-col items-center'>
            <img className='w-[120px] h-[120px] rounded-[50%] mb-[10px]' src={user.profilePic} alt="" />
            <p className='text-[16px] text-[#444444] font-[700]'>{user.firstName} {user.lastName}</p>
            <p className='text-[14px] font-[600]'>{user.email}</p>
        </div>
        <div className='flex-[5]'>
            <div className='flex justify-between bg-[#F5F5F5] py-[11px] rounded-[8px]'>
                <p className='text-[18px] flex-1 font-[500] pl-[20px]'>First Name</p>
                <p className=' flex-1 text-[18px] text-[#444444] font-[600] '>: &nbsp; &nbsp; {user.firstName}</p>
            </div>
            <div className='flex justify-between py-[12px] rounded-[8px]'>
                <p className='text-[18px] flex-1 font-[500] pl-[20px]'>Last Name</p>
                <p className='flex-1 text-[18px] text-[#444444] font-[600]'>: &nbsp; &nbsp; {user.lastName}</p>
            </div>
            <div className='flex justify-between bg-[#F5F5F5] py-[12px] rounded-[8px]'>
                <p className='text-[18px] flex-1 font-[500] pl-[20px]'>UserName</p>
                <p className='flex-1 text-[18px] text-[#444444] font-[600]'>: &nbsp; &nbsp; {user.userName}</p>
            </div>
            <div className='flex justify-between py-[12px] rounded-[8px]'>
                <p className='text-[18px] flex-1 font-[500] pl-[20px]'>Email</p>
                <p className='flex-1 text-[14px] text-[#444444] md:text-[18px] font-[600] '>: &nbsp; &nbsp; {user.email}</p>
            </div>
            <div className='flex justify-between bg-[#F5F5F5] py-[12px] rounded-[8px]'>
                <p className='flex-1 text-[18px] font-[500] pl-[20px]'>Role</p>
                <p className='flex-1 justify-self-start text-[#444444] text-[18px] font-[600]'>: &nbsp; &nbsp; {user.role}</p>
            </div>
        

        </div>
        <div className='flex-[1]'></div>
    </div>
    </div>
  )
}

export default UserProfile







{/* <UpdateProfileForm/>      */}
