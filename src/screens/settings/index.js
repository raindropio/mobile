import React from 'react'
import Stack from 'co/navigation/stack'

import Menu from './menu'
import Backups from './backups'
import Browser from './browser'
import Files from './files'
import Pro from './pro'
import Profile from './profile'
import Appearance from './appearance'
import ExtensionMode from './extension_mode'

export default class Settings extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name='menu' component={Menu} options={Menu.options} />
                
                <Stack.Screen name='backups' component={Backups} options={Backups.options} />
                <Stack.Screen name='browser' component={Browser} options={Browser.options} />
                <Stack.Screen name='files' component={Files} options={Files.options} />
                <Stack.Screen name='pro' component={Pro} options={Pro.options} />
                <Stack.Screen name='profile' component={Profile} options={Profile.options} />
                <Stack.Screen name='appearance' component={Appearance} options={Appearance.options} />
                <Stack.Screen name='extension_mode' component={ExtensionMode} options={ExtensionMode.options} />
            </Stack.Navigator>
        )
    }
}