import { Fragment, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

export function Title({ children }) {
    const navigation = useNavigation()

    //must return a fresh React element from the callback every call —
    //returning the same `children` reference makes react-native-screens
    //re-attach the same native View to a new Toolbar and crash with
    //"The specified child already has a parent" on Android.
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: typeof children == 'object'
                ? () => <Fragment>{children}</Fragment>
                : children
        })
    }, [navigation, children])

    return null
}