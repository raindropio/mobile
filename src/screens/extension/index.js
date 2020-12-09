import React from 'react'
import Stack from 'co/navigation/stack'
import { connect } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'

import { Provider } from './context'
import Auth from './auth'
import SelectCollection from './select-collection'
import QuickSave from './quick-save'

class Extension extends React.Component {
    static options = {
        stackPresentation: 'transparentModal',
        stackAnimation: 'none'
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
            <Provider>
                <Stack.Navigator mode='modal' screenOptions={this.screenOptions}>
                    {authorized == 'no' && (
                        <Stack.Screen name='auth' component={Auth} options={Auth.options} />
                    )}
                    <Stack.Screen name='select-collection' component={SelectCollection} options={SelectCollection.options} />
                    <Stack.Screen name='quick-save' component={QuickSave} options={QuickSave.options} />
                </Stack.Navigator>
            </Provider>
        )
    }
}

export default connect(
	state => ({
		authorized: userStatus(state).authorized
	}),
	{ refresh }
)(Extension)