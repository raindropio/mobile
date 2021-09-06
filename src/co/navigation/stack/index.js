import { createStackNavigator } from '@react-navigation/stack'
import getNavigator from './navigator'

const Stack = createStackNavigator()

export default {
    Navigator: getNavigator(Stack),
    Screen: Stack.Screen,
    Group: Stack.Group
}