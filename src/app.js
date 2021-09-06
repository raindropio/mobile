import React, { useEffect, useCallback } from 'react'
import RNBootSplash from 'react-native-bootsplash'
import NavigationContainer from 'co/navigation/container'
import Stack from 'co/navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh as refreshUser } from 'data/actions/user'

import auth from 'screens/auth'
import Space from 'screens/space'
import Bookmark from 'screens/bookmark'
import Bookmarks from 'screens/bookmarks'
import Collection from 'screens/collection'
import Create from 'screens/create'
import Group from 'screens/group'
import overlay from 'screens/overlay'
import Tag from 'screens/tag'
import Sharing from 'screens/sharing'
import Settings from 'screens/settings'

const linking = {
    prefixes: ['rnio://'],
    config: {
        screens: {
            jwt: 'jwt'
        }
    }
}

export default function App() {
    //auth state
    const dispatch = useDispatch()
    const authorized = useSelector(state=>userStatus(state).authorized)
    useEffect(()=>dispatch(refreshUser()), [])

    //splash
    const onReady = useCallback(()=>RNBootSplash.hide({fade: true}), [])

    return (
        <NavigationContainer
            linking={linking}
            onReady={onReady}>
            <Stack.Navigator screenOptions={{headerShown: false, presentation: 'modal'}}>
                {authorized=='no' ?
                    //no auth
                    auth() :
                    //logged in
                    (<>
                        <Stack.Screen name='space' component={Space} options={Space.options} />
                        <Stack.Screen name='bookmark' component={Bookmark} options={Bookmark.options} />
                        <Stack.Screen name='bookmarks' component={Bookmarks} options={Bookmarks.options} />
                        <Stack.Screen name='collection' component={Collection} options={Collection.options} />
                        <Stack.Screen name='create' component={Create} options={Create.options} />
                        <Stack.Screen name='group' component={Group} options={Group.options} />
                        <Stack.Screen name='tag' component={Tag} options={Tag.options} />
                        <Stack.Screen name='sharing' component={Sharing} options={Sharing.options} />
                        <Stack.Screen name='settings' component={Settings} options={Settings.options} />
                    </>)
                }

                {/* Helpers */}
                {overlay()}
            </Stack.Navigator>
        </NavigationContainer>
    )
}