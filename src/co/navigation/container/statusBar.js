import styled from 'styled-components/native'
import { Platform, StatusBar } from 'react-native'

export default Platform.OS=='android' ? 
    styled(StatusBar).attrs(({theme})=>({
        animated: false,
        translucent: true,
        backgroundColor: theme.background.regular,
        barStyle: theme.dark ? 'light-content' : 'dark-content'
    }))`` :
    StatusBar