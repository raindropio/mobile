import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

export const Window = styled(SafeAreaView).attrs({
    edges: ['bottom']
})`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const Element = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 50px;
    background: ${({theme})=>theme.background.regular};
    padding: 4px;
    shadow-radius: 5px;
    shadow-opacity: 0.3;
    shadow-offset: 0 3px;
    border-width: ${StyleSheet.hairlineWidth}px;
    border-color: #00000030;
    elevation: 5;
`

export const Message = styled.Text`
    font-size: ${({theme})=>theme.fontSize.primary}px;
    color: ${({theme})=>theme.text.regular};
    margin: 0 4px;
    margin-right: ${({theme})=>theme.padding.small}px;
`