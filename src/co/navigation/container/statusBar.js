import styled from 'styled-components/native'
import { Platform, StatusBar } from 'react-native'

export default Platform.OS=='android' ? 
    styled(StatusBar).attrs(({theme})=>({
        animated: false,
        translucent: theme.isExtension, //main app should be false, otherwise it jumps right after open
        backgroundColor: 'transparent', //transparent doesnt work in android <=25
        barStyle: theme.dark ? 'light-content' : 'dark-content'
    }))`` :
    StatusBar