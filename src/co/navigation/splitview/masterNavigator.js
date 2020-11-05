import * as React from 'react'
import { useNavigationBuilder, createNavigatorFactory, StackRouter, DrawerActions } from '@react-navigation/native';
import { StackView } from '@react-navigation/stack'
import globalScreenOptions from '../stack/screenOptions'

const MyStackRouter = options => {
    const router = StackRouter(options);
  
    return {
        ...router,

        getStateForAction(state, action, options) {
            if (_dispatch){
                _dispatch(DrawerActions.openDrawer())
                _dispatch(action)
            }

            if (action.type == 'GO_BACK')
                return router.getStateForAction(state, action, options)

            return state
        }
    }
}

function StackNavigator({
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
    ...rest
}) {
    const { state, descriptors, navigation } = useNavigationBuilder(MyStackRouter, {
        initialRouteName,
        backBehavior,
        children,
        screenOptions: {
            ...globalScreenOptions,
            ...screenOptions,
        },
    });

    return (
        <StackView
            {...rest}
            state={state}
            navigation={navigation}
            descriptors={descriptors}
        />
    )
}

var _dispatch

export function overrideDispatch(dispatch) {
    _dispatch = dispatch
}

export default createNavigatorFactory(StackNavigator)()