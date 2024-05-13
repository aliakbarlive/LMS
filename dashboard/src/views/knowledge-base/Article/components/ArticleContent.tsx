import { useEffect } from 'react'

import Loading from '@/components/shared/Loading'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import MediaSkeleton from '@/components/shared/loaders/MediaSkeleton'
import TextBlockSkeleton from '@/components/shared/loaders/TextBlockSkeleton'
import ArticleAction from './ArticleAction'
import { getArticle, useAppDispatch, useAppSelector } from '../store'
import parse from 'html-react-parser'
import { useLocation } from 'react-router-dom'

const ArticleContent = ({ articleId }: { articleId?: string }) => {
    const dispatch = useAppDispatch()

    const article = useAppSelector(
        (state) => state.knowledgeBaseArticle.data.article
    )
    const loading = useAppSelector(
        (state) => state.knowledgeBaseArticle.data.loading
    )

    const { search } = useLocation()

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const fetchData = () => {
        if (articleId) {
            dispatch(getArticle({ id: articleId }))
        }
    }

    return (
        <Loading
            loading={loading}
            customLoader={
                <div className="flex flex-col gap-8">
                    <MediaSkeleton />
                    <TextBlockSkeleton rowCount={6} />
                    <TextBlockSkeleton rowCount={4} />
                    <TextBlockSkeleton rowCount={8} />
                </div>
            }
        >
            {
                article.cover_image ? <div className='flex justify-center items-center w-full mb-[2rem]'>
                <img src={article.cover_image} alt="" className='object-cover w-full'/>
            </div> : ''
            }
            <h3>{article.title}</h3>
            
            {/* <div className="flex items-center mt-4 gap-4">
                <UsersAvatarGroup
                    avatarProps={{ size: 40 }}
                    users={article.authors || []}
                />
                <div className="text-xs">
                    <div className="mb-1">
                        Created by:
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {article.createdBy}
                        </span>
                    </div>
                    <div>
                        <span>Last updated: {article.updateTime}</span>
                        <span className="mx-2">•</span>
                        <span>{article.timeToRead} min read</span>
                        <span className="mx-2">•</span>
                        <span>{article.viewCount} viewed</span>
                    </div>
                </div>
            </div> */}
            <div className="mt-8 prose dark:prose-invert max-w-none">
                <p>{parse(article.content || '')}</p>
            </div>
            {/* <ArticleAction /> */}
        </Loading>
    )
}

export default ArticleContent
