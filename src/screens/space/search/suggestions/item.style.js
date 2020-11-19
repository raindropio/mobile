import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export const Button = styled(RectButton)`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    height: ${({theme}) => theme.height.button}px;
    border-radius: ${({theme}) => theme.height.button/2}px;
    border-width: ${StyleSheet.hairlineWidth}px;
    border-color: ${({theme}) => theme.color.border};
    margin: ${({theme}) => theme.padding.micro}px;
    padding-horizontal: ${({theme}) => theme.padding.medium}px;
`

export const Label = styled.Text`
    font-size: ${({theme}) => theme.fontSize.secondary}px;
    color: ${({theme}) => theme.text.regular};
`

export const IconWrap = styled.View`
    margin-right: ${({theme}) => theme.padding.micro}px;
`