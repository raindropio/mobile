import { useMemo, useCallback, useEffect } from 'react';
import { Linking } from 'react-native'
import { useLinkTo } from '@react-navigation/native'
import RNBootSplash from 'react-native-bootsplash'
import NavigationContainer from 'co/navigation/container'
import { Modals } from 'co/navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'
import { isTablet } from 'modules/native'

import Auth from 'screens/auth'
import Space from 'screens/space'
import Bookmark from 'screens/bookmark'
import Bookmarks from 'screens/bookmarks'
import Collection from 'screens/collection'
import Create from 'screens/create'
import Group from 'screens/group'
import Overlay from 'screens/overlay'
import Open from 'screens/open'
import Tag from 'screens/tag'
import Settings from 'screens/settings'

function Routes({ logged, last_collection }) {
    const spaceInitialParams = useMemo(()=>({
        spaceId: last_collection
    }), [last_collection])

    //deep links
    const linkTo = useLinkTo()
    useEffect(()=>{
        Linking.getInitialURL().then(url=>{
            if (url)
                linkTo(url.replace('rnio:/', ''))
        })
    }, [linkTo])

    return logged ? (
        <Modals.Navigator>
            <Modals.Screen name='space' component={Space} options={Space.options} initialParams={spaceInitialParams} />
            <Modals.Screen name='bookmark' component={Bookmark} options={Bookmark.options} />
            <Modals.Screen name='bookmarks' component={Bookmarks} options={Bookmarks.options} />
            <Modals.Screen name='collection' component={Collection} options={Collection.options} />
            <Modals.Screen name='create' component={Create} options={Create.options} />
            <Modals.Screen name='open' component={Open} options={Open.options} />
            <Modals.Screen name='overlay' component={Overlay} options={Overlay.options} />
            <Modals.Screen name='group' component={Group} options={Group.options} />
            <Modals.Screen name='tag' component={Tag} options={Tag.options} />
            <Modals.Screen name='settings' component={Settings} options={Settings.options} />
        </Modals.Navigator>
    ) : (
        <Auth />
    )
}

export default function App() {
    const dispatch = useDispatch()

    //auth
    const logged = useSelector(state=>userStatus(state).authorized=='yes')
    useEffect(()=>{dispatch(refresh())}, [])

    //initial params
    const last_collection = useSelector(state=>state.config.last_collection)

    //initial routes
    const initialState = useMemo(()=>{
        if (logged)
            return {
                routes: [{
                    name: 'space',
                    state: {
                        routes: [
                            { name: 'home' },
                            { name: 'browse', params: { spaceId: last_collection||0 } },
                        ],
                    },
                }]
            }
    }, [logged, last_collection])

    //hide boot splash
    const onReady = useCallback(()=>{
        setTimeout(() => {
            RNBootSplash.hide({ fade: !isTablet })
        }, isTablet ? 0 : 50)
    }, [])

    //deep links
    const linking = useMemo(()=>({
        prefixes: ['rnio://'],
        config: {
            screens: {
                jwt: 'jwt',
                open: {
                    path: 'open',
                    screens: {
                        internal: {
                            path: 'internal',
                            parse: {
                                bookmark: (bookmark) => JSON.parse(decodeURIComponent(bookmark)),
                            }
                        }
                    }
                },
                settings: {
                    path: 'settings',
                    screens: {
                        pro: 'pro'
                    }
                }
            }
        }
    }), [])

    return (
        <NavigationContainer
            initialState={initialState}
            linking={linking}
            onReady={onReady}>
            <Routes
                logged={logged}
                last_collection={last_collection} />
        </NavigationContainer>
    )
}