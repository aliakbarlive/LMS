import React from 'react'
import UpdateProfileForm from './components/UpdateProfileForm'


interface UpdateProfileProps{

}

const UpdateProfile:React.FC<UpdateProfileProps> = () => {
  
    return (
       <> 
            <p className='capitalize py-4 ps-4 bg-[#f0ede5] mb-4 rounded-xl text-2xl text-black font-semibold sm:text-start text-center'>Update your Profile</p>
            <UpdateProfileForm/>
            
       </>
    )
}

export default UpdateProfile












{/* <ProfileEdit/> */}