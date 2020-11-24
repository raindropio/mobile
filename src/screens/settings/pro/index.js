import React from 'react'
import t from 't'
import Stack from 'co/navigation/stack'

import Status from './status'
import Buy from './buy'

function ProScreen() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='status' component={Status} options={Status.options} />
            <Stack.Screen name='buy' component={Buy} options={Buy.options} />
        </Stack.Navigator>
    )
}

ProScreen.options = {
    title: t.s('upgradeAccount')
}

export default ProScreen