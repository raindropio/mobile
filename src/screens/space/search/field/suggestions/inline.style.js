import styled from 'styled-components/native'
import { StyleSheet } from 'react-native' 

export const List = styled.FlatList.attrs(({status})=>({
    keyboardShouldPersistTaps: 'always',
    horizontal: true,
    contentContainerStyle: {
        opacity: status == 'loaded' ? 1 : 0
    }
}))`
    flex-grow: 0;
    background: ${({theme})=>theme.background.disabled};
    padding: ${({theme}) => theme.padding.micro}px;
    border-top-width: ${StyleSheet.hairlineWidth}px;
	border-top-color: ${({theme})=>theme.color.border};
`