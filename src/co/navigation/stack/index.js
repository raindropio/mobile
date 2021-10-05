import { createStackNavigator } from './usual'
import { createNativeStackNavigator } from './modals'
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
            replaceAnimation: 'push'
        }
    }),
    Screen: ModalsStack.Screen
}