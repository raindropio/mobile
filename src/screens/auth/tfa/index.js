import Stack, { screenOptions } from 'co/navigation/stack'
import Login from './login'

export default function TFA({ route: { params={} } }) {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name='login' component={Login} options={Login.options} initialParams={params} />
        </Stack.Navigator>
    )
}