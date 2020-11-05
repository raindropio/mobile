import React from 'react'
import Stack from 'co/navigation/stack'
import { connect } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'

import { Fade } from 'co/navigation/transition'
import Init from './init'
import Location from './location'
import Save from './save'
import Auth from './auth'

class Extension extends React.Component {
    static options = {
        stackAnimation: 'fade',
        stackPresentation: 'transparentModal'
    }
    
    screenOptions = {
        ...Fade
    }

    componentDidMount() {
		this.props.refresh()
    }

    render() {
        const { authorized } = this.props

        return (
            <Stack.Navigator screenOptions={this.screenOptions}>
                {authorized=='no' ? (
                    <Stack.Screen name='auth' component={Auth} options={Auth.options} />
                ) : (<>
                    <Stack.Screen name='init' component={Init} options={Init.options} />
                    <Stack.Screen name='location' component={Location} options={Location.options} />
                    <Stack.Screen name='save' component={Save} options={Save.options} />
                </>)}
            </Stack.Navigator>
        )
    }
}

export default connect(
	state => ({
		authorized: userStatus(state).authorized
	}),
	{ refresh }
)(Extension)