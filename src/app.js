import React from 'react'
import NavigationContainer from 'co/navigation/container'
import { Modals } from 'co/navigation/stack'
import { connect } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'

import Auth from './screens/auth'
import Space from './screens/space'
import Bookmark from './screens/bookmark'
import Bookmarks from './screens/bookmarks'
import Collection from './screens/collection'
import Group from './screens/group'
import Tag from './screens/tag'
import Settings from './screens/settings'

class App extends React.Component {
    componentDidMount() {
		this.props.refresh()
    }

    renderLogged() {
        return (
            <Modals.Navigator>
                <Modals.Screen name='space' component={Space} options={Space.options} />
                <Modals.Screen name='bookmark' component={Bookmark} options={Bookmark.options} />
                <Modals.Screen name='bookmarks' component={Bookmarks} options={Bookmarks.options} />
                <Modals.Screen name='collection' component={Collection} options={Collection.options} />
                <Modals.Screen name='group' component={Group} options={Group.options} />
                <Modals.Screen name='tag' component={Tag} options={Tag.options} />
                <Modals.Screen name='settings' component={Settings} options={Settings.options} />
            </Modals.Navigator>
        )
    }
    
	render() {
        const { authorized } = this.props

        return (
            <NavigationContainer>
                {authorized=='no' ? 
                    <Auth /> : 
                    this.renderLogged()
                }
            </NavigationContainer>
        )
    }
}

export default connect(
	state => ({
		authorized: userStatus(state).authorized
	}),
	{ refresh }
)(App)