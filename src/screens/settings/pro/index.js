import t from 't'
import Stack from 'co/navigation/stack'

import Status from './status'
import Purchase from './purchase'

function ProScreen() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='status' component={Status} options={Status.options} />
            <Stack.Screen name='purchase' component={Purchase} options={Purchase.options} />
        </Stack.Navigator>
    )
}

ProScreen.options = {
    title: t.s('upgradeAccount')
}

export default ProScreen