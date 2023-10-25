import { useCallback } from 'react'
import { ThemeProvider } from 'styled-components'
import NavigationContainer from 'co/navigation/container'
import Stack from 'co/navigation/stack'
import { close } from 'modules/extension'

import * as Extension from 'screens/extension'
import * as Bookmark from 'screens/bookmark'
import * as Collection from 'screens/collection'
import Create from 'screens/create'
import * as Group from 'screens/group'
import * as Tag from 'screens/tag'

export default function ExtensionRegistry() {
    const onUnhandledAction = useCallback((action)=>{
        if (action.type == 'GO_BACK')
            close()
    }, [])

    return (
        <ThemeProvider theme={{ isExtension: true }}>
            <NavigationContainer onUnhandledAction={onUnhandledAction}>
                <Stack.Navigator>
                    <Stack.Screen name='extension/init' component={Extension.Init} options={Extension.Init.options} />
                    <Stack.Screen name='extension/auth' component={Extension.Auth} options={Extension.Auth.options} />

                    {/* Bookmark */}
                    <Stack.Screen name='bookmark/edit' component={Bookmark.Edit} options={Bookmark.Edit.options} />
                    <Stack.Screen name='bookmark/add' component={Bookmark.Add} options={Bookmark.Add.options} />
                    <Stack.Screen name='bookmark/cover' component={Bookmark.Cover} options={Bookmark.Cover.options} />
                    <Stack.Screen name='bookmark/highlights' component={Bookmark.Highlights} options={Bookmark.Highlights.options} />
                    <Stack.Screen name='bookmark/path' component={Bookmark.Path} options={Bookmark.Path.options} />
                    <Stack.Screen name='bookmark/tags' component={Bookmark.Tags} options={Bookmark.Tags.options} />

                    {/* Collection */}
                    <Stack.Screen name='collection/edit' component={Collection.Edit} options={Collection.Edit.options} />
                    <Stack.Screen name='collection/add' component={Collection.Add} options={Collection.Add.options} />
                    <Stack.Screen name='collection/remove' component={Collection.Remove} options={Collection.Remove.options} />
                    <Stack.Screen name='collection/cover' component={Collection.Cover} options={Collection.Cover.options} />
                    <Stack.Screen name='collection/sort' component={Collection.Sort} options={Collection.Sort.options} />
                    <Stack.Screen name='collection/view' component={Collection.View} options={Collection.View.options} />
                    <Stack.Screen name='collection/path' component={Collection.Path} options={Collection.Path.options} />
                    <Stack.Screen name='collection/sharing' component={Collection.Sharing} options={Collection.Sharing.options} />
                    <Stack.Screen name='collection/sharing/add' component={Collection.SharingAdd} options={Collection.SharingAdd.options} />
                    <Stack.Screen name='collection/sharing/edit' component={Collection.SharingEdit} options={Collection.SharingEdit.options} />

                    {/* Create */}
                    <Stack.Screen name='create' component={Create} options={Create.options} />

                    {/* Group */}
                    <Stack.Screen name='group/add' component={Group.Add} options={Group.Add.options} />
                    <Stack.Screen name='group/edit' component={Group.Edit} options={Group.Edit.options} />

                    {/* Tag */}
                    <Stack.Screen name='tag/edit' component={Tag.Edit} options={Tag.Edit.options} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    )
}