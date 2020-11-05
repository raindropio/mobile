import * as React from 'react'
import { useNavigationBuilder, createNavigatorFactory, StackRouter } from '@react-navigation/native';
import { NativeStackView } from 'react-native-screens/native-stack'

const ModalStackRouter = options => {
    const router = StackRouter(options)
    const onBeforeStateChange = options.onBeforeStateChange
  
    return {
        ...router,

        getStateForAction(state, action, options) {
            if (onBeforeStateChange)
                onBeforeStateChange(state, action, options)

            return router.getStateForAction(state, action, options)
        }
    }
}

function StackNavigator({
    initialRouteName,
    children,
    screenOptions,
    onBeforeStateChange, //new!
    ...rest
}) {
    const router = useNavigationBuilder(ModalStackRouter, {
        initialRouteName,
        children,
        onBeforeStateChange,
        screenOptions: {
            stackPresentation: 'formSheet',
            headerShown: false,
            ...screenOptions,
        },
    });

    return (
        <NativeStackView
            {...rest}
            {...router}
        />
    )
}

export const createNativeStackNavigator = createNavigatorFactory(StackNavigator)