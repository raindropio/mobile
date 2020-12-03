import React from 'react'
import Stack from 'co/navigation/stack'
import Tint from 'co/bookmarks/item/tint'

import Edit from './edit'
import Add from './add'
import Create from './create'
import Cover from './cover'
import Tags from './tags'
import Path from './path'

function Bookmark({ route: { params={} } }) {
    return (
        <Tint _id={params.params ? params.params._id : params._id}>
            <Stack.Navigator>
                <Stack.Screen name='edit' component={Edit} options={Edit.options} initialParams={params} />
                <Stack.Screen name='add' component={Add} options={Add.options} />
                <Stack.Screen name='create' component={Create} options={Create.options} />
                <Stack.Screen name='cover' component={Cover} options={Cover.options} />
                <Stack.Screen name='tags' component={Tags} options={Tags.options} />
                <Stack.Screen name='path' component={Path} options={Path.options} />
            </Stack.Navigator>
        </Tint>
    )
}

export default Bookmark