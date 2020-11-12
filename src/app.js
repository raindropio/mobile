import React from 'react'
import { Linking } from 'react-native'
import NavigationContainer from 'co/navigation/container'
import { Modals } from 'co/navigation/stack'
import { connect } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'

import Auth from './screens/auth'
import Space, { getInitialState } from './screens/space'
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
        const { authorized, initialState } = this.props

        return (
            <NavigationContainer 
                initialState={authorized=='no' ? undefined : initialState}>
                {authorized=='no' ? 
                    <Auth /> : 
                    this.renderLogged()
                }
            </NavigationContainer>
        )
    }
}

class DefaultPath extends React.Component {
    state = {
        initialState: undefined,
        loading: true
    }

    async componentDidMount() {
        let initialState = getInitialState(this.props.last_collection)

        if (initialState && await Linking.getInitialURL())
            initialState = undefined
        
        this.setState({ loading: false, initialState })
    }

    render() {
        if (!this.state.loading)
            return <App {...this.props} {...this.state} />

        return null
    }
}

export default connect(
	state => ({
        authorized: userStatus(state).authorized,
        last_collection: state.config.last_collection
	}),
	{ refresh }
)(DefaultPath)