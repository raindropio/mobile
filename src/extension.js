import React from 'react'
import { ThemeProvider } from 'styled-components'
import { close } from 'modules/extension'
import NavigationContainer from 'co/navigation/container'
import Stack from 'co/navigation/stack'

import Extension from 'screens/extension'
import Bookmark from 'screens/bookmark'
import Collection from 'screens/collection'
import Group from 'screens/group'
import Tag from 'screens/tag'

function Close({ navigation }) {
    React.useEffect(() => 
        navigation.addListener('focus', ()=>close())
    , [navigation]);

    return null
}

export default class ExtensionRegistry extends React.Component {
    screenOptions = {
        headerShown: false,
        gestureEnabled: false, //true is buggy in ios
        cardStyle: {
            backgroundColor: 'transparent'
        }
    }

    initialState = {
        routes: [
            { name: '_close' },
            { name: 'extension' }
        ]
    }

    theme = {
        isExtension: true
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <NavigationContainer initialState={this.initialState}>
                    <Stack.Navigator mode='modal' screenOptions={this.screenOptions}>
                        <Stack.Screen name='_close' component={Close} />
                        <Stack.Screen name='extension' component={Extension} options={Extension.options} />
                        <Stack.Screen name='bookmark' component={Bookmark} options={Bookmark.options} />
                        <Stack.Screen name='collection' component={Collection} options={Collection.options} />
                        <Stack.Screen name='group' component={Group} options={Group.options} />
                        <Stack.Screen name='tag' component={Tag} options={Tag.options} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        )
    }
}