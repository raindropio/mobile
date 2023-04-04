//react + navigation
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { enableFreeze } from 'react-native-screens'

//polyfills
import 'react-native-url-polyfill/auto'

//redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { withLocalReducer } from 'data'
import localReducers from 'local/reducers'

//styles
import Appearance from 'modules/appearance'
import Translate from 'modules/translate/component'

enableFreeze(true)

//common bootstrap logic
const flexOne = {flex:1}
function Bootstrap(Component) {
    //init redux (do not destructure object, for some reason fails in ios production build)
    const storage = withLocalReducer(localReducers)

    return ()=>(
        <GestureHandlerRootView style={flexOne}>
            <Provider store={storage.store}>
                <PersistGate persistor={storage.persistor}>
                    <Translate>
                        <Appearance>
                            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                                <Component />
                            </SafeAreaProvider>
                        </Appearance>
                    </Translate>
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    )
}

//register targets
AppRegistry.registerComponent('app', () => 
    Bootstrap(require('./app').default)
)

AppRegistry.registerComponent('extension', () => 
    Bootstrap(require('./extension').default)
)