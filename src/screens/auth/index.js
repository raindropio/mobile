import React from 'react'
import Stack from 'co/navigation/stack'

import Home from './home'
import Email from './email'
import JWT from './jwt'
import Native from './native'

export default function Auth() {
    return (
        <>
            <Stack.Screen name='home' component={Home} options={Home.options} />
            <Stack.Screen name='email' component={Email} options={Email.options} />
            <Stack.Screen name='native' component={Native} options={Native.options} />
            <Stack.Screen name='jwt' component={JWT} options={JWT.options} />
        </>
    )
}