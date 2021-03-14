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
    padding: ${({theme})=>theme.padding.small}px;
    shadow-radius: 20px;
    shadow-opacity: 0.2;
    shadow-offset: 0 10px;
    border-width: ${StyleSheet.hairlineWidth}px;
    border-color: ${({theme})=>theme.color.border};
    elevation: 5;
`

export const Message = styled.Text`
    font-size: ${({theme})=>theme.fontSize.primary}px;
    color: ${({theme})=>theme.text.regular};
    margin: 0 ${({theme})=>theme.padding.small}px;
`