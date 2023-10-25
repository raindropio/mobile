import { useMemo, useCallback, useEffect } from 'react';
import { Linking } from 'react-native'
import { useLinkTo } from '@react-navigation/native'
import RNBootSplash from 'react-native-bootsplash'
import NavigationContainer from 'co/navigation/container'
import Stack from 'co/navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'

import Pushes from './pushes'
import * as Auth from 'screens/auth'
import * as Space from 'screens/space'
import * as Browser from 'screens/browser'
import * as Bookmark from 'screens/bookmark'
import * as Bookmarks from 'screens/bookmarks'
import * as Collection from 'screens/collection'
import Create from 'screens/create'
import * as Group from 'screens/group'
import * as Tag from 'screens/tag'
import * as Settings from 'screens/settings'

function Routes({ logged }) {
    //runtime deep links
    const linkTo = useLinkTo()
    useEffect(()=>{
        Linking.getInitialURL().then(url=>{
            if (url)
                linkTo(url.replace('rnio:/', ''))
        })
    }, [linkTo])

    return (
        <Stack.Navigator>
            {logged ? (
                <Stack.Group>
                    {/* Space */}
                    <Stack.Screen name='space/home' component={Space.Home} options={Space.Home.options} />
                    <Stack.Screen name='space/browse' component={Space.Browse} options={Space.Browse.options} />
                    <Stack.Screen name='space/search' component={Space.Search} options={Space.Search.options} />

                    {/* Browser */}
                    <Stack.Screen name='browser/internal' component={Browser.Internal} options={Browser.Internal.options} />
                    <Stack.Screen name='browser/font' component={Browser.Font} options={Browser.Font.options} />

                    {/* Bookmark */}
                    <Stack.Screen name='bookmark/edit' component={Bookmark.Edit} options={Bookmark.Edit.options} />
                    <Stack.Screen name='bookmark/add' component={Bookmark.Add} options={Bookmark.Add.options} />
                    <Stack.Screen name='bookmark/cover' component={Bookmark.Cover} options={Bookmark.Cover.options} />
                    <Stack.Screen name='bookmark/highlights' component={Bookmark.Highlights} options={Bookmark.Highlights.options} />
                    <Stack.Screen name='bookmark/path' component={Bookmark.Path} options={Bookmark.Path.options} />
                    <Stack.Screen name='bookmark/tags' component={Bookmark.Tags} options={Bookmark.Tags.options} />

                    {/* Bookmarks */}
                    <Stack.Screen name='bookmarks/move' component={Bookmarks.Move} options={Bookmarks.Move.options} />
                    <Stack.Screen name='bookmarks/tag' component={Bookmarks.Tag} options={Bookmarks.Tag.options} />

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

                    {/* Settings */}
                    <Stack.Screen name='settings' component={Settings.Menu} options={Settings.Menu.options} />
                    <Stack.Screen name='settings/backups' component={Settings.Backups} options={Settings.Backups.options} />
                    <Stack.Screen name='settings/browser' component={Settings.Browser} options={Settings.Browser.options} />
                    <Stack.Screen name='settings/files' component={Settings.Files} options={Settings.Files.options} />
                    <Stack.Screen name='settings/pro' component={Settings.ProStatus} options={Settings.ProStatus.options} />
                    <Stack.Screen name='settings/pro/purchase' component={Settings.ProPurchase} options={Settings.ProPurchase.options} />
                    <Stack.Screen name='settings/profile' component={Settings.Profile} options={Settings.Profile.options} />
                    <Stack.Screen name='settings/appearance' component={Settings.Appearance} options={Settings.Appearance.options} />
                    <Stack.Screen name='settings/language' component={Settings.Language} options={Settings.Language.options} />
                    <Stack.Screen name='settings/share_extension' component={Settings.ShareExtension} options={Settings.ShareExtension.options} />
                </Stack.Group>
            ) : (
                <Stack.Group>
                    <Stack.Screen name='home' component={Auth.Home} options={Auth.Home.options} />
                    <Stack.Screen name='login' component={Auth.Login} options={Auth.Login.options} />
                    <Stack.Screen name='register' component={Auth.Register} options={Auth.Register.options} />
                    <Stack.Screen name='native' component={Auth.Native} options={Auth.Native.options} />
                    <Stack.Screen name='jwt' component={Auth.JWT} options={Auth.JWT.options} />
                    <Stack.Screen name='tfa' component={Auth.TFA} options={Auth.TFA.options} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    )
}

export default function App() {
    const dispatch = useDispatch()

    //auth
    const logged = useSelector(state=>userStatus(state).authorized=='yes')
    useEffect(()=>{dispatch(refresh())}, [])

    //hide boot splash
    const onReady = useCallback(()=>RNBootSplash.hide({ fade: true }), [])

    //deep links
    const linking = useMemo(()=>({
        prefixes: ['rnio://'],
        config: {
            screens: {
                jwt: 'jwt',
                settings: 'settings'
            }
        }
    }), [])

    return (
        <Pushes>
            <NavigationContainer
                linking={linking}
                onReady={onReady}>
                <Routes
                    logged={logged} />
            </NavigationContainer>
        </Pushes>
    )
}