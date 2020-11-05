import React from 'react'
import Stack from 'co/navigation/stack'

import Edit from './edit'
import Add from './add'
import NotEmpty from './notEmpty'
import Reorder from './reorder'

export default function Group({ route: { params={} } }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name='edit' component={Edit} options={Edit.options} initialParams={params} />
            <Stack.Screen name='add' component={Add} options={Add.options} />
            <Stack.Screen name='notEmpty' component={NotEmpty} options={NotEmpty.options} />
            <Stack.Screen name='reorder' component={Reorder} options={Reorder.options} />
        </Stack.Navigator>
    )
}