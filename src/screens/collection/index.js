import React from 'react'
import Stack from 'co/navigation/stack'

import Menu from './menu'
import Edit from './edit'
import Add from './add'
import Remove from './remove'
import Cover from './cover'
import Sort from './sort'
import Path from './path'
import SharingList from './sharing/list'
import SharingAdd from './sharing/add'
import SharingEdit from './sharing/edit'

export default function Collection({ route: { params={} } }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name='menu' component={Menu} options={Menu.options} initialParams={params} />
            
            <Stack.Screen name='add' component={Add} options={Add.options} />
            <Stack.Screen name='edit' component={Edit} options={Edit.options} />
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