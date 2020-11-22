import styled from 'styled-components/native'
import { StyleSheet } from 'react-native' 

export const List = styled.FlatList.attrs({
    keyboardShouldPersistTaps: 'always',
    horizontal: true
})`
    flex-grow: 0;
    background: ${({theme})=>theme.background.alternative};
    padding: ${({theme}) => theme.padding.micro}px;
    border-top-width: ${StyleSheet.hairlineWidth}px;
	border-top-color: ${({theme})=>theme.color.border};
`