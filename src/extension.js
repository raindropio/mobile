import React from 'react'
import { ThemeProvider } from 'styled-components'
import NavigationContainer from 'co/navigation/container'
import Stack from 'co/navigation/stack'
import { StackActions } from '@react-navigation/native'

import extension from 'screens/extension'
import Bookmark from 'screens/bookmark'
import Collection from 'screens/collection'
import Create from 'screens/create'
import overlay from 'screens/overlay'
import Group from 'screens/group'
import Tag from 'screens/tag'

export default class ExtensionRegistry extends React.Component {
    theme = { isExtension: true }

    onFailedStateChange = (state,action)=>{
        if (action.type == 'GO_BACK')
            return StackActions.replace('close')
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{headerShown: false, presentation: 'modal'}}
                        onFailedStateChange={this.onFailedStateChange}>
                        {extension()}

                        <Stack.Screen name='bookmark' component={Bookmark} options={Bookmark.options} />
                        <Stack.Screen name='collection' component={Collection} options={Collection.options} />
                        <Stack.Screen name='create' component={Create} options={Create.options} />
                        <Stack.Screen name='group' component={Group} options={Group.options} />
                        <Stack.Screen name='tag' component={Tag} options={Tag.options} />

                        {overlay()}
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        )
    }
}