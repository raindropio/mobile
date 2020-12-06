import React from 'react'
import Stack from 'co/navigation/stack'
import { connect } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'

import Auth from './auth'
import Load from './load'
import Create from 'screens/create'
import Location from './location'

class Extension extends React.Component {
    static options = {
        stackPresentation: 'transparentModal'
    }
    
    screenOptions = {
        animationTypeForReplace: 'push'
    }
    
    async componentDidMount() {
        this.props.refresh()
    }
    
    render() {
        const { authorized } = this.props

        return (
            <Stack.Navigator mode='modal' screenOptions={this.screenOptions}>
                {authorized == 'no' && (
                    <Stack.Screen name='auth' component={Auth} options={Auth.options} />
                )}
                <Stack.Screen name='load' component={Load} options={Load.options} />
                <Stack.Screen name='create' component={Create} options={Create.options} />
                <Stack.Screen name='location' component={Location} options={Location.options} />
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