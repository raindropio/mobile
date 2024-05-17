//react + navigation
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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

// do not use enableFreeze! it breaks react-native-screens

//common bootstrap logic
const flexOne = {flex:1}
function Bootstrap(Component) {
    //init redux (do not destructure object, for some reason fails in ios production build)
    const storage = withLocalReducer(localReducers)

    return ()=>(
        <Provider store={storage.store}>
            <PersistGate persistor={storage.persistor}>
                <Translate>
                    <Appearance>
                        <SafeAreaView style={flexOne}>
                            <GestureHandlerRootView style={flexOne}>
                                <Component />
                            </GestureHandlerRootView>
                        </SafeAreaView>
                    </Appearance>
                </Translate>
            </PersistGate>
        </Provider>
    )
}

//register targets
AppRegistry.registerComponent('app', () => 
    Bootstrap(require('./app').default)
)

AppRegistry.registerComponent('extension', () => 
    Bootstrap(require('./extension').default)
)