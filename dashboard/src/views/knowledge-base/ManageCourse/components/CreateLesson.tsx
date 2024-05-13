import React from 'react'

import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { FcImageFile } from 'react-icons/fc'

import CreatNewLessonForm from '@/components/shared/CreatNewLessonForm'

const CreateLesson = () => {

    const maxUpload = 2
    const beforeUpload = (files: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 500000

        if (fileList.length >= maxUpload) {
            return `You can only upload ${maxUpload} file(s)`
        }

        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }
    const onFileUpload = (files: File[], form: any) => {
        if (files && files.length > 0) {
            const uploadedFile = files[0]
            const fileNameWithExtension = uploadedFile.name
            console.log(fileNameWithExtension, 'fileNameWithExtension')
        }
    }

  return (
    <div>
        <CreatNewLessonForm />
       
    </div>
  )
}

export default CreateLesson