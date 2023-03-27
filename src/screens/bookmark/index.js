import Stack from 'co/navigation/stack'
import Tint from 'co/bookmarks/item/tint'
import { useTheme } from 'styled-components'

import Cover from './cover'
import Edit from './edit'
import Highlights from './highlights'
import Path from './path'
import Tags from './tags'

function Bookmark({ route: { params={} } }) {
    const { isExtension } = useTheme()

    return (
        <Tint _id={params.params ? params.params._id : params._id}>
            <Stack.Navigator>
                <Stack.Screen name='edit' component={Edit} options={Edit.options} initialParams={params} />
                {!isExtension && <Stack.Screen name='add' component={require('./add').default} options={require('./add').default.options} />}
                <Stack.Screen name='cover' component={Cover} options={Cover.options} />
                <Stack.Screen name='highlights' component={Highlights} options={Highlights.options} />
                <Stack.Screen name='path' component={Path} options={Path.options} />
                <Stack.Screen name='tags' component={Tags} options={Tags.options} />
            </Stack.Navigator>
        </Tint>
    )
}

Bookmark.options = ({ route: { params={} } })=>({
    stackAnimation: params.stackAnimation
})

export default Bookmark