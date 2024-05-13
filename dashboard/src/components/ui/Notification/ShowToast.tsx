import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'


const ShowToast = (
    type: 'success' | 'warning' | 'danger' | 'info',message:string
) => {
    toast.push(
        <Notification
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            type={type}
        >
            {message}
        </Notification>
    )
}

export default ShowToast