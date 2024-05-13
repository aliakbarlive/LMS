import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import GetUserRole from '@/components/shared/GetUserRole'
import CreateUserForm from '@/components/shared/CreateUser/CreateUserForm'
const CreateNormalUser = () => {
  const userRoles = ['Admin', 'Manager', 'Corporate', 'Editor','Instructor', 'Student'];
  return (
    <Container>
        <AdaptableCard>
            <div className="flex items-center gap-4 pb-4">
                    <h3 className='inline dark:text-white '>Create a New User</h3>
                    <GetUserRole/>
            </div>
            <CreateUserForm userRoles={userRoles} />
        </AdaptableCard>
    </Container>
  )
}


export default CreateNormalUser