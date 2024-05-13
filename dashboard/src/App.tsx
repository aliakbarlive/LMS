import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import mockServer from './mock'
import appConfig from '@/configs/app.config'
import './locales'
import { GoogleOAuthProvider } from '@react-oauth/google'

const environment = process.env.NODE_ENV

/**
 * Set enableMock(Default false) to true at configs/app.config.js
 * If you wish to enable mock api
 */
if (environment !== 'production' && appConfig.enableMock) {
    mockServer({ environment })
}
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GoogleOAuthProvider clientId='988924154564-dogseot2bifafe00qi9p8h45druecug2.apps.googleusercontent.com'>
                <BrowserRouter basename='/dashboard'>
                    <Theme>
                        <Layout />
                    </Theme>
                </BrowserRouter>
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    )
}

export default App
