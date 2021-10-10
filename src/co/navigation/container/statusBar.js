import styled from 'styled-components/native'
import { Platform, StatusBar } from 'react-native'

export default Platform.OS=='android' ? 
    styled(StatusBar).attrs(({theme})=>({
        animated: false,
        translucent: theme.isExtension, //main app should be false, otherwise it jumps right after open
        backgroundColor: !theme.dark && Platform.Version < 23 ? '#00000060' : theme.background.regular,
        barStyle: theme.dark ? 'light-content' : 'dark-content'
    }))`` :
    StatusBar