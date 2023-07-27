import Stack, { screenOptions } from 'co/navigation/stack'

import Menu from './menu'
import Backups from './backups'
import Browser from './browser'
import Files from './files'
import Pro from './pro'
import Profile from './profile'
import Appearance from './appearance'
import Language from './language'
import ShareExtension from './share_extension'

export default function Settings() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name='menu' component={Menu} options={Menu.options} />
            
            <Stack.Screen name='backups' component={Backups} options={Backups.options} />
            <Stack.Screen name='browser' component={Browser} options={Browser.options} />
            <Stack.Screen name='files' component={Files} options={Files.options} />
            <Stack.Screen name='pro' component={Pro} options={Pro.options} />
            <Stack.Screen name='profile' component={Profile} options={Profile.options} />
            <Stack.Screen name='appearance' component={Appearance} options={Appearance.options} />
            <Stack.Screen name='language' component={Language} options={Language.options} />
            <Stack.Screen name='share_extension' component={ShareExtension} options={ShareExtension.options} />
        </Stack.Navigator>
    )
}