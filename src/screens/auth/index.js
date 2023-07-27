import { Modals, screenOptions } from 'co/navigation/stack'

import Home from './home'
import Email from './email'
import JWT from './jwt'
import TFA from './tfa'
import Native from './native'

import Overlay from '../overlay'

export default function Auth() {
    return (
        <Modals.Navigator screenOptions={{...screenOptions, headerShown: false}}>
            <Modals.Screen name='home' component={Home} options={Home.options} />
            <Modals.Screen name='email' component={Email} options={Email.options} />
            <Modals.Screen name='native' component={Native} options={Native.options} />
            <Modals.Screen name='jwt' component={JWT} options={JWT.options} />
            <Modals.Screen name='tfa' component={TFA} options={TFA.options} />

            <Modals.Screen name='overlay' component={Overlay} options={Overlay.options} />
        </Modals.Navigator>
    )
}