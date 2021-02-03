import React from 'react'
import Stack from 'co/navigation/stack'
import { connect } from 'react-redux'
import { userStatus } from 'data/selectors/user'
import { refresh } from 'data/actions/user'

import { Provider } from './context'
import Auth from './auth'
import SelectCollection from './select-collection'
import QuickSave from './quick-save'
import ExtensionMode from 'screens/settings/extension_mode'

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

    renderScreens = ()=>{
        const { authorized, add_auto_save } = this.props

        if (authorized == 'no')
            return <Stack.Screen name='auth' component={Auth} options={Auth.options} />

        return (
            <>
                {add_auto_save ? (
                    <Stack.Screen name='quick-save' component={QuickSave} options={QuickSave.options} />
                ) : (
                    <Stack.Screen name='select-collection' component={SelectCollection} options={SelectCollection.options} />
                )}

                <Stack.Screen name='extension_mode' component={ExtensionMode} options={ExtensionMode.options} />
            </>
        )
    }
    
    render() {
        return (
            <Provider>
                <Stack.Navigator mode='modal' screenOptions={this.screenOptions}>
                    {this.renderScreens()}
                </Stack.Navigator>
            </Provider>
        )
    }
}

export default connect(
	state => ({
        authorized: userStatus(state).authorized,
        add_auto_save: state.config.add_auto_save
	}),
	{ refresh }
)(Extension)