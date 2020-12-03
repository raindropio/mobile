import React from 'react'
import Stack from 'co/navigation/stack'
import { connect } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'
import { data } from 'modules/extension'

import Auth from './auth'
import Loading from './loading'
import Create from 'screens/bookmark/create'
import Location from './location'

class Extension extends React.Component {
    static options = {
        stackPresentation: 'transparentModal'
    }
    
    state = {
        type: '',
        values: []
    }

    screenOptions = {
        animationEnabled: false
    }
    
    async componentDidMount() {
        this.props.refresh()
        this.setState(await data())
    }
    
    render() {
        const { authorized } = this.props
        const { type } = this.state

        return (
            <Stack.Navigator screenOptions={this.screenOptions}>
                {authorized == 'idle' || !type && (
                    <Stack.Screen name='loading' component={Loading} options={Loading.options} />
                )}
                {authorized == 'no' && (
                    <Stack.Screen name='auth' component={Auth} options={Auth.options} />
                )}

                <Stack.Screen name='create' component={Create} options={Create.options} initialParams={this.state} />
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