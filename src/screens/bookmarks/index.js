import Stack, { screenOptions } from 'co/navigation/stack'

import Move from './move'
import Tag from './tag'

export default function Bookmarks() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name='move' component={Move} options={Move.options} />
            <Stack.Screen name='tag' component={Tag} options={Tag.options} />
        </Stack.Navigator>
    )
}