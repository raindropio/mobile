import React from 'react'
import Stack from 'co/navigation/stack'

import Home from './home'
import Add from './add'
import Edit from './edit'

export default function Sharing({ route: { params={} } }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} options={Home.options} initialParams={params} />
            <Stack.Screen name='add' component={Add} options={Add.options} />
            <Stack.Screen name='edit' component={Edit} options={Edit.options} />
        </Stack.Navigator>
    )
}