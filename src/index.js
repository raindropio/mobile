import Navigation from 'modules/navigation'
import { withLocalReducer } from 'data'
import localReducers from 'local/reducers'
import { subscribe } from 'modules/reduxUtils'
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
                    appState = state
                    root(appState)
                }
            )
        })
    }else{
        //only for android
        root(appState)
    }
})