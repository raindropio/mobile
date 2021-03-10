import React from 'react'
import { Platform } from 'react-native'
import Stack from 'co/navigation/stack'
import Header from 'co/navigation/header'

import _Error from './error'
import Sheet from './sheet'
import { Screen as Loading } from './loading'

const screenOptions = ({ navigation })=>({
    title: '',
    headerLeft: null,
    headerRight: ()=>(
        <Header.Button
            icon='close-circle'
            variant='fill'
            color='text.secondary'
            onPress={navigation.goBack} />
    ),
    headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0
    }
})

function Overlay() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name='error' component={_Error} options={_Error.options} />
            <Stack.Screen name='loading' component={Loading} options={Loading.options} />
            <Stack.Screen name='sheet' component={Sheet} options={Sheet.options} />
        </Stack.Navigator>
    )
}

Overlay.options = {
    stackPresentation: Platform.OS=='ios' ? 'modal' : 'transparentModal',
    stackAnimation: Platform.OS=='ios' ? 'default' : 'fade'
}

export default Overlay