import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },

    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'updateUser',
        path: '/updateUser',
        component: lazy(() => import('@/views/profile/UpdateProfile')),
        authority: [],
    },
    {
        key: 'enrolledCourses',
        path: '/enrolled-courses',
        component: lazy(() => import('@/views/enrolled-course/EnrolledCourses')),
        authority: [],
    },
    {
        key: 'userAdmin',
        path: '/userAdmin',
        component: lazy(() => import('@/views/userAdmin/UserList')),
        authority: [],
    },
    {
        key: 'invoicelist',
        path: '/invoice-list',
        component: lazy(() => import('@/views/Invoice/InvoiceList')),
        authority: [],
    },
    {
        key: 'invoicelist.details',
        path: '/invoice-list/:invoice',
        component: lazy(() => import('@/views/Invoice/InvoiceDetail')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/add-course',
        component: lazy(() => import('@/views/knowledge-base/ManageCourse')),
        meta: {
            header: 'Create Course',
            // extraHeader: lazy(
            //     () =>
            //         import(
            //             '@/views/knowledge-base/ManageArticles/components/PanelHeader'
            //         )
            // ),
            headerContainer: true,
        },
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/course-list',
        component: lazy(() => import('@/views/home-cards/Coursescard')),
        authority: [],
    },
    {
        key: 'courselist.course.id',
        path: '/course/:courseId',
        component: lazy(() => import('@/views/CourseView/Course')),
        authority: [],
    },
    {
        key: 'courselist.editcourse.id',
        path: '/editcourse/:courseId',
        component: lazy(() => import('@/views/knowledge-base/EditCourse/components/Editor')),
        authority: [],
        meta: {
            header: 'Edit Course',
            headerContainer: true,
        }
    },
    {
        key: 'appsknowledgeBase.article',
        path: `/article`,
        component: lazy(() => import('@/views/knowledge-base/Article')),
        authority: [],
    },
    {
        key: 'appsknowledgeBase.manageArticles',
        path: `/manage-articles`,
        component: lazy(() => import('@/views/knowledge-base/ManageArticles')),
        authority: [],
        meta: {
            header: 'Manage Articles',
            extraHeader: lazy(
                () =>
                    import(
                        '@/views/knowledge-base/ManageArticles/components/PanelHeader'
                    )
            ),
            headerContainer: true,
        },
    },
    {
        key: 'appsknowledgeBase.editArticle',
        path: `/edit-article`,
        component: lazy(() => import('@/views/knowledge-base/EditArticle')),
        authority: [],
    },
    {
        key: 'enrolled-courses.id',
        path: '/enrolled-courses/:courseId',
        component: lazy(() => import('@/views/enrolled-course/StartLearning')),
        authority: [],
    },
    {
        key :'admin.editors',
        path :'/editors',
        component: lazy(() => import('@/views/editor/viewEditors/ViewEditors')),
        authority: [],
    },
    {
        key :'admin.editor.create',
        path :'/create-editor',
        component: lazy(() => import('@/views/editor/createEditor/CreateEditor')),
        authority: [],
    },
    {
        key :'admin.instructor',
        path :'/instructor',
        component: lazy(() => import('@/views/instructor/viewInstructor/ViewInstructor')),
        authority: [],
    },
    {
        key :'admin.instructor.create',
        path :'/create-instructor',
        component: lazy(() => import('@/views/instructor/createInstructor/CreateInstructor')),
        authority: [],
    },
    {
        key :'admin.manager',
        path :'/manager',
        component: lazy(() => import('@/views/manager/viewmanager/ViewManager')),
        authority: [],
    },
    {
        key :'admin.manager.create',
        path :'/create-manager',
        component: lazy(() => import('@/views/manager/createmanager/CreateManager')),
        authority: [],
    },
    {
        key :'admin.User',
        path :'/users',
        component: lazy(() => import('@/views/normaluser/viewNormalUser/ViewNormalUser')),
        authority: [],
    },
    {
        key :'admin.user.create',
        path :'/create-user',
        component: lazy(() => import('@/views/normaluser/createNormalUser/CreateNormalUser')),
        authority: [],
    },
    {
        key :'s-admin.Admin',
        path :'s-admin/admin',
        component: lazy(() => import('@/views/admin/viewadmin/ViewAdmin')),
        authority: [],
    },
    {
        key :'s-admin.admin.create',
        path :'s-admin/create-admin',
        component: lazy(() => import('@/views/admin/createAdmin/CreatAdmin')),
        authority: [],
    },
    {
        key :'groupMenu.casdollapse.profilepiclist',
        path :'/profile-picture/list',
        component: lazy(() => import('@/views/approvals/profile-pic-approval/ProfilePictureApproval')),
        authority: [],
    },
    {
        key :'edit.userId',
        path :'/user/upDateProfile/',
        component: lazy(() => import('@/views/profile/UpdateProfile')),
        authority: [],
    },
    {
        key :'view.userId',
        path :'/user/profile/',
        component: lazy(() => import('@/views/profile/UserProfile')),
        authority: [],
    },
]
