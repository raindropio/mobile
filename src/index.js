import Navigation from 'modules/navigation'
import { withLocalReducer } from 'data'
import localReducers from 'local/reducers'
import { subscribe } from 'modules/reduxUtils'
import Sentry from 'modules/sentry'
import { registerScreens } from 'screens'
import root from './root'

let firstRun = true
let appState = {}

Navigation.events().registerAppLaunchedListener(() => {
    if (firstRun){
        firstRun = false

        registerScreens()

        //Init storage
        const { store, persistor } = withLocalReducer(localReducers)
        persistor.subscribe(()=>{
            if (!persistor.getState().bootstrapped) return;

            subscribe(
                store, 
                (state)=>({
                    root:           (state.user.status.authorized=='no') ? 'auth' : 'app',
                    theme:          ((state.local||{}).theme)
                }),
                ['root', 'theme'],
                (state)=>{
                    //init app
                    appState = state
                    root(appState)

                    //set user to sentry
                    Sentry.setUser(store.getState().user.current)
                }
            )
        })
    }else{
        //only for android
        root(appState)
    }
})