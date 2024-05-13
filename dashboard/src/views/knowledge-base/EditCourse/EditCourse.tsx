import { useEffect } from 'react'
import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Button from '@/components/ui/Button'
import Editor from './components/Editor'
import useQuery from '@/utils/hooks/useQuery'
import { injectReducer } from '@/store'
import reducer, {
    getCourse,
    setCourse,
    setCategory,
    setMode,
    useAppDispatch,
    useAppSelector,
} from './store'

injectReducer('knowledgeBaseEditCourse', reducer)

const EditCourse = () => {
    const dispatch = useAppDispatch()

    const mode = useAppSelector(
        (state) => state.knowledgeBaseEditCourse.data.mode
    )

    const query = useQuery()

    const id = query.get('id')

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        const categoryLabel = query.get('categoryLabel')
        const categoryValue = query.get('categoryValue')
        const categoryId = query.get('categoryId')

        if (id) {
            dispatch(getCourse({ id }))
        }

        if (!id) {
            dispatch(setMode('add'))
            dispatch(setCourse(''))
        }

        if (categoryLabel && categoryValue && categoryId) {
            dispatch(setCategory({ categoryLabel, categoryValue, categoryId }))
        }
    }

    const onModeChange = (mode: string) => {
        dispatch(setMode(mode))
    }

    return (
        <Container>
            <AdaptableCard>
                <div className="max-w-[800px] mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        {mode === 'preview' ? (
                            <Button
                                size="sm"
                                onClick={() =>
                                    onModeChange(id ? 'edit' : 'add')
                                }
                            >
                                Back
                            </Button>
                        ) : (
                           <></>
                        )}
                    </div>
                    <Editor />
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default EditCourse
