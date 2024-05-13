import React from 'react'
import EditAddressInfoForm from './EditAddressInfoForm'
import EditUserBillingAddressForm from './EditUserBillingAddressForm'
import EditUserBusinessAddressForm from './EditUserBusinessAddressForm'
const EditAddress = () => {
  return (
    <div className='p-6'>
        <EditAddressInfoForm />
        <EditUserBillingAddressForm/>
        <EditUserBusinessAddressForm/>
    </div>
  )
}

export default EditAddress