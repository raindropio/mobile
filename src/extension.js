import React from 'react'
import { ThemeProvider } from 'styled-components'
import NavigationContainer from 'co/navigation/container'
import { Modals } from 'co/navigation/stack'
import { StackActions } from '@react-navigation/native'

import Extension from 'screens/extension'
import Bookmark from 'screens/bookmark'
import Collection from 'screens/collection'
import Overlay from 'screens/overlay'
import Group from 'screens/group'
import Tag from 'screens/tag'

export default class ExtensionRegistry extends React.Component {
    _navigator = React.createRef()

    theme = { isExtension: true }

    onFailedStateChange = (state,action)=>{
        if (action.type == 'GO_BACK')
            return StackActions.replace('extension', {screen: 'close'})
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <NavigationContainer>
                    <Modals.Navigator onFailedStateChange={this.onFailedStateChange}>
                        <Modals.Screen name='extension' component={Extension} options={Extension.options} />

                        <Modals.Screen name='bookmark' component={Bookmark} options={Bookmark.options} />
                        <Modals.Screen name='collection' component={Collection} options={Collection.options} />
                        <Modals.Screen name='overlay' component={Overlay} options={Overlay.options} />
                        <Modals.Screen name='group' component={Group} options={Group.options} />
                        <Modals.Screen name='tag' component={Tag} options={Tag.options} />
                    </Modals.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        )
    }
}