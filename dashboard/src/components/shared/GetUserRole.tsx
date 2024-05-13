import React from 'react'

import { useAppSelector } from '@/views/Users/store';

const GetUserRole = () => {
    const user_type =useAppSelector(state=>state.auth.user.user_type);
  return (
    <span className='dark:text-white'>{user_type && `${user_type} Dashboard`}</span>
  )
}

export default GetUserRole