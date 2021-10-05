import * as React from 'react'
import { useNavigationBuilder, createNavigatorFactory, StackRouter } from '@react-navigation/native';
import { StackView } from '@react-navigation/stack'

const ModalStackRouter = options => {
    const router = StackRouter(options)
    const onFailedStateChange = options.onFailedStateChange
  
    return {
        ...router,

        getStateForAction(state, action, options) {
            const newState = router.getStateForAction(state, action, options)

            if (!newState && 
                typeof onFailedStateChange == 'function'){
                const replace = onFailedStateChange(state, action, options)
                if (replace)
                    return router.getStateForAction(state, replace, options)

                return state
            }

            return newState
        }
    }
}

function StackNavigator({
    initialRouteName,
    children,
    screenOptions,
    onFailedStateChange, //new!
    ...rest
}) {
    const router = useNavigationBuilder(ModalStackRouter, {
        initialRouteName,
        children,
        onFailedStateChange,
        screenOptions
    });

    return (
        <StackView
            {...rest}
            {...router}
        />
    )
}

export const createStackNavigator = createNavigatorFactory(StackNavigator)