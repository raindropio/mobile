import React from 'react'
import { Platform } from 'react-native'
import Stack from 'co/navigation/stack'
import Header from 'co/navigation/header'

import _Error from './error'
import Confirm from './confirm'
import Sheet from './sheet'
import { Screen as Loading } from './loading'

const screenOptions = ({ navigation })=>({
    presentation: Platform.OS=='ios' ? 'modal' : 'transparentModal',
    animation: Platform.OS=='ios' ? 'default' : 'fade',
    title: '',
    headerShown: true,
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

function overlay() {
    return (
        <Stack.Group screenOptions={screenOptions}>
            <Stack.Screen name='overlay/error' component={_Error} options={_Error.options} />
            <Stack.Screen name='overlay/confirm' component={Confirm} options={Confirm.options} />
            <Stack.Screen name='overlay/loading' component={Loading} options={Loading.options} />
            <Stack.Screen name='overlay/sheet' component={Sheet} options={Sheet.options} />
        </Stack.Group>
    )
}

export default overlay