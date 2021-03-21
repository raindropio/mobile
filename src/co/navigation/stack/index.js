import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from './modals'
import MyNavigator from './navigator'
import { Platform } from 'react-native'
import { isTablet } from 'modules/native'

//fix bug for samsung galaxy tab s7
//https://github.com/software-mansion/react-native-screens/issues/811
const isSamsungTablet = (Platform.OS=='android' && isTablet && ((Platform.constants.Brand||'').toLowerCase() == 'samsung'))

const Stack = createStackNavigator()
const ModalsStack = isSamsungTablet ? createStackNavigator() : createNativeStackNavigator()

export default {
    Navigator: MyNavigator(Stack.Navigator),
    Screen: Stack.Screen
}

export const Modals = {
    Navigator: MyNavigator(ModalsStack.Navigator, {
        screenOptions: {
            stackPresentation: 'formSheet',
            headerShown: false,
            replaceAnimation: 'push'
        }
    }),
    Screen: ModalsStack.Screen
}