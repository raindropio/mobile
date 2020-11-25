import _ from 'lodash'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Wrap = styled.View`
    flex-direction: row;
    height: 100%;
    padding: 0 4px;
`

//Button itself
export const ButtonTouch = styled(BorderlessButton).attrs(({ disabled })=>({
    enabled: !disabled,
    borderless: true
}))`
    align-items: center;
    justify-content: center;
    height: 100%;
`
export const ButtonWrap = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 ${({theme})=>theme.padding.medium - 4}px;
`

//Text
export const ButtonText = styled.Text`
    color: ${({color, theme})=>theme.color[color] || _.get(theme, color)};
    font-size: ${({theme})=>theme.fontSize.primary}px;
    ${({bold, theme}) => bold ? theme.fontWeight.semibold+';' : ''}
    text-transform: ${Platform.OS=='android' ? 'uppercase' : 'none'};
`