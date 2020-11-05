import React from 'react'
import Stack from 'co/navigation/stack'

import Edit from './edit'
import Add from './add'
import Remove from './remove'
import Cover from './cover'
import Sort from './sort'
import Path from './path'
import SharingList from './sharing/list'
import SharingAdd from './sharing/add'
import SharingEdit from './sharing/edit'
import System from './system'

export default function Collection({ route: { params={} } }) {
    return (
        <Stack.Navigator initialRouteName={params._id > 0 ? 'edit' : 'system'}>
            <Stack.Screen name='edit' component={Edit} options={Edit.options} initialParams={params} />
            <Stack.Screen name='system' component={System} options={System.options} initialParams={params} />

            <Stack.Screen name='add' component={Add} options={Add.options} />
            <Stack.Screen name='remove' component={Remove} options={Remove.options} />
            <Stack.Screen name='cover' component={Cover} options={Cover.options} />
            <Stack.Screen name='sort' component={Sort} options={Sort.options} />
            <Stack.Screen name='path' component={Path} options={Path.options} />

            <Stack.Screen name='sharing/list' component={SharingList} options={SharingList.options} />
            <Stack.Screen name='sharing/add' component={SharingAdd} options={SharingAdd.options} />
            <Stack.Screen name='sharing/edit' component={SharingEdit} options={SharingEdit.options} />
        </Stack.Navigator>
    )
}