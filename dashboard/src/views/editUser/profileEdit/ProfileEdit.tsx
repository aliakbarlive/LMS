import React from 'react'
import ProfileEditForm from './ProfileEditForm'
const ProfileEdit = () => {
   const  userRoles=['admin']
  return (
    <div className='p-6 '>
       <ProfileEditForm userRoles={['admin']}/>
    </div>
  )
}

export default ProfileEdit