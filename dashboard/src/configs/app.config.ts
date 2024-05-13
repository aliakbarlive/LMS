export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
    baseUrl: string
}
const isProduction = process.env.NODE_ENV === 'production'
const appConfig: AppConfig = {
    baseUrl: isProduction ? window.location.origin : 'http://localhost:5151',
    apiPrefix: 'api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
