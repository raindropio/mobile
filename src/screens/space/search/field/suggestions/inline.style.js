import styled from 'styled-components/native'
import { StyleSheet } from 'react-native' 
import { FlatList } from 'react-native-gesture-handler'

export const Wrap = styled.View`
    flex-grow: 0;
`

export const List = styled(FlatList).attrs(({status})=>({
    keyboardShouldPersistTaps: 'always',
    horizontal: true,
    contentContainerStyle: {
        opacity: status == 'loaded' ? 1 : 0
    }
}))`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${({theme})=>theme.background.keyboard};
    padding: ${({theme}) => theme.padding.micro}px;
    border-top-width: ${StyleSheet.hairlineWidth}px;
	border-top-color: ${({theme})=>theme.color.border};
`