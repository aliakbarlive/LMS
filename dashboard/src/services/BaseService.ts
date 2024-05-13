import axios, { AxiosError } from 'axios'
import appConfig from '@/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import store, { signOutSuccess } from '../store'
import ShowToast from '@/components/ui/Notification/ShowToast'

const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 60000,
    baseURL: `${appConfig.baseUrl}/${appConfig.apiPrefix}`,
})

BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let accessToken = (persistData as any).auth.session.token

        if (!accessToken) {
            const { auth } = store.getState()
            accessToken = auth.session.token
        }

        if (accessToken) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(signOutSuccess())
        }

        // handleErrorResponse(error)

        return Promise.reject(error)
    }
)

// function handleErrorResponse(error: AxiosError): void {
//     if (error.response) {
//         const status = error.response.status

//         if (status === 401) {
//             // Unauthorized - Token is not valid
//             ShowToast("danger",'Unauthorized. Please login again.')
//         } else if (status === 404) {
//             // Not Found
//             ShowToast("info",'Not Found.')
//         } else if (status === 422) {
//             // Validation Error
//             ShowToast('warning','Validation Failed. Some Fields are required')
//         } 
//     } else if (
//         error.code === 'ECONNABORTED' &&
//         error.message.includes('timeout')
//     ) {
//         // Timeout error
//         ShowToast('info','Timeout')
//     } else if (error.request) {
//         // Network error
//         ShowToast('info','Network, Please Check Internet Connection')
//     } 
// }



export default BaseService
