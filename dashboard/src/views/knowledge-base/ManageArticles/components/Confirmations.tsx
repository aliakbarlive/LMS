import { useRef } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    setCategorizedArticles,
    toggleArticleDeleteConfirmation,
    toggleCategoryDeleteConfirmation,
    toggleCategoryRenameDialog,
    toggleAddCategoryDialog,
    useAppDispatch,
    useAppSelector,
    CategorizedArticles,
    getCategorizedArticles,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import uniqueId from 'lodash/uniqueId'
import { apiCreateCategory, apiDeleteArticle, apiDeleteCategory, apiUpdateCategory } from '@/services/KnowledgeBaseService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'


const Confirmations = ({ data }: { data: CategorizedArticles[] }) => {
    const dispatch = useAppDispatch()

    const categoryRenameInputRef = useRef<HTMLInputElement>(null)
    const categoryAddInputRef = useRef<HTMLInputElement>(null)

    const articleDeleteConfirmation = useAppSelector(
        (state) =>
            state.knowledgeBaseManageArticles.data.articleDeleteConfirmation
    )
    const categoryDeleteConfirmation = useAppSelector(
        (state) =>
            state.knowledgeBaseManageArticles.data.categoryDeleteConfirmation
    )
    const categoryRenameDialog = useAppSelector(
        (state) => state.knowledgeBaseManageArticles.data.categoryRenameDialog
    )
    const categoryAddDialog = useAppSelector(
        (state) => state.knowledgeBaseManageArticles.data.categoryAddDialog
    )
    const selected = useAppSelector(
        (state) => state.knowledgeBaseManageArticles.data.selected
    )

    const onArticleDeleteConfirmationClose = () => {
        dispatch(toggleArticleDeleteConfirmation(false))
    }

    const onArticleDeleteConfirm = async() => {
        const resp = await apiDeleteArticle({_id:selected.id})
        console.log('RES : ',resp)
        if (resp.data) {
            dispatch(getCategorizedArticles())
            toast.push(
                <Notification
                    title={`Successfully deleted article`}
                    type="success"
                />,
                {
                    placement: 'top-center',
                }
            )
        }
        dispatch(toggleArticleDeleteConfirmation(false))
    }

    const onCategoryRenameDialogClose = () => {
        dispatch(toggleCategoryRenameDialog(false))
    }

    const onRenameDialogConfirm = async() => {
        if (categoryRenameInputRef.current) {
            if(!categoryRenameInputRef.current.value) return
            const inputValue = categoryRenameInputRef.current.value;

            const newData = {
                label: inputValue,
                value: inputValue.includes(' ')
                  ? inputValue.replace(/\s+/g, '-')
                  : inputValue,
                _id: selected.id,
              };

            const resp = await apiUpdateCategory(newData)
            console.log('RES : ',resp)
            if (resp.data) {
                dispatch(getCategorizedArticles())
                toast.push(
                    <Notification
                        title={`Successfully updated category`}
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
            }
        }
        dispatch(toggleCategoryRenameDialog(false))
    }

    const onCategoryDeleteConfirmationClose = () => {
        dispatch(toggleCategoryDeleteConfirmation(false))
    }

    const onCategoryDeleteConfirm = async() => {
        const resp = await apiDeleteCategory({_id:selected.id})
        console.log('RES : ',resp)
        if (resp.data) {
            dispatch(getCategorizedArticles())
            toast.push(
                <Notification
                    title={`Successfully deleted category`}
                    type="success"
                />,
                {
                    placement: 'top-center',
                }
            )
        }
        dispatch(toggleCategoryDeleteConfirmation(false))
    }

    const onCategoryAddDialogClose = () => {
        dispatch(toggleAddCategoryDialog(false))
    }

    const onCategoryAddDialogConfirm = async() => {
        if (categoryAddInputRef.current) {
            if(!categoryAddInputRef.current.value) return
            const inputValue = categoryAddInputRef.current.value;
            const newData = {
              label: inputValue,
              value: inputValue.includes(' ')
                ? inputValue.replace(/\s+/g, '-')
                : inputValue,
              _id: selected.id,
            };
            
            const resp = await apiCreateCategory(newData)
            console.log('RESs : ',resp)
            if (resp.data) {
                dispatch(getCategorizedArticles())
                toast.push(
                    <Notification
                        title={`Successfully added category`}
                        type="success"
                    />,
                    {
                        placement: 'top-center',
                    }
                )
            }
        }
        dispatch(toggleAddCategoryDialog(false))
    }

    return (
        <>
            <ConfirmDialog
                isOpen={articleDeleteConfirmation}
                type="danger"
                title="Delete article"
                confirmButtonColor="red-600"
                onClose={onArticleDeleteConfirmationClose}
                onRequestClose={onArticleDeleteConfirmationClose}
                onCancel={onArticleDeleteConfirmationClose}
                onConfirm={onArticleDeleteConfirm}
            >
                <p>
                    Are you sure you want to delete this article? This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
            <ConfirmDialog
                isOpen={categoryDeleteConfirmation}
                type="danger"
                title="Delete category"
                confirmButtonColor="red-600"
                onClose={onCategoryDeleteConfirmationClose}
                onRequestClose={onCategoryDeleteConfirmationClose}
                onCancel={onCategoryDeleteConfirmationClose}
                onConfirm={onCategoryDeleteConfirm}
            >
                <p>
                    Are you sure you want to delete this category? All the
                    articles under this category will be deleted as well. All
                    This action cannot be undone.
                </p>
            </ConfirmDialog>
            <Dialog
                isOpen={categoryRenameDialog}
                onClose={onCategoryRenameDialogClose}
                onRequestClose={onCategoryRenameDialogClose}
            >
                <h5 className="mb-4">Rename Category</h5>
                <div>
                    <Input ref={categoryRenameInputRef} />
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onCategoryRenameDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={onRenameDialogConfirm}>
                        Confirm
                    </Button>
                </div>
            </Dialog>
            <Dialog
                isOpen={categoryAddDialog}
                onClose={onCategoryAddDialogClose}
                onRequestClose={onCategoryAddDialogClose}
            >
                <h5 className="mb-4">Add Category</h5>
                <div>
                    <Input ref={categoryAddInputRef} />
                </div>
                
                <div className="text-right mt-6">
                    <Button
                        size="sm"
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onCategoryAddDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={onCategoryAddDialogConfirm}
                    >
                        Add
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default Confirmations
