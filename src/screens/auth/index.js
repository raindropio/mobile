import React from 'react'
import { Modals } from 'co/navigation/stack'

import Home from './home'
import Email from './email'

export default function Auth() {
    return (
        <Modals.Navigator>
            <Modals.Screen name='home' component={Home} options={Home.options} />
            <Modals.Screen name='email' component={Email} options={Email.options} />
        </Modals.Navigator>
    )
}