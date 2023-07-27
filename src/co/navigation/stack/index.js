import { createStackNavigator } from './usual'
import { createNativeStackNavigator } from './modals'
import screenOptions from './screenOptions'

const Stack = createStackNavigator()
const ModalsStack = createNativeStackNavigator()

export default {
    Navigator: Stack.Navigator,
    Screen: Stack.Screen,
    Group: Stack.Group
}

export const Modals = {
    Navigator: ModalsStack.Navigator,
    Screen: ModalsStack.Screen,
    Group: ModalsStack.Group
}

export { screenOptions }