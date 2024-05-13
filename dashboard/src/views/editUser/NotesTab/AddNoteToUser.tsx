import React from 'react'

import CreateNote from '@/components/shared/Notes/CreateNote'
import ViewNotes from './ViewNotes'

 const AddNoteToUser = () => {
  return (
    <div className='p-6'>
        <CreateNote mode='add'/>
        <div className="pt-4">
            <ViewNotes/>
        </div>
    </div>
  )
}

export default AddNoteToUser