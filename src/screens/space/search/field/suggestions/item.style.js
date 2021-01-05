import styled from 'styled-components/native'
import { StyleSheet, Platform } from 'react-native' 
import { RectButton } from 'react-native-gesture-handler'

export const Button = styled(RectButton)`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    height: ${({theme}) => theme.height.button}px;
    margin: ${({theme}) => theme.padding.micro}px;
    padding-horizontal: ${({theme}) => theme.padding.medium}px;

    ${({theme})=>Platform.select({
        ios: `
            border-radius: ${theme.height.button/2}px;
            border-width: ${StyleSheet.hairlineWidth}px;
            border-color: ${theme.color.border};
        `,
        android: `
            background: ${theme.background.alternative};
        `
    })}
`

function aplifier(count, { min, max }) {
    if (!max || min==max || min>max) return 0
    return ( (count-min) / (max-min) * 14 ) || 0
}

export const Label = styled.Text`
    font-size: ${({theme, count=0, cloud={}}) => theme.fontSize.primary + aplifier(count, cloud)}px;
    color: ${({theme}) => theme.text.regular};
`

export const IconWrap = styled.View`
    margin-left: ${({theme}) => -theme.padding.micro}px;
    margin-right: ${({theme}) => theme.padding.small}px;
`