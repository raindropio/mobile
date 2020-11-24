import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import MyNavigator from './navigator'

const Stack = createStackNavigator()
const ModalsStack = createNativeStackNavigator()

export default {
    Navigator: MyNavigator(Stack.Navigator),
    Screen: Stack.Screen
}

export const Modals = {
    Navigator: MyNavigator(ModalsStack.Navigator, {
        screenOptions: {
            stackPresentation: 'formSheet',
            headerShown: false,
        }
    }),
    Screen: ModalsStack.Screen
}