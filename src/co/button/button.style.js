import _ from 'lodash'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'

export const ButtonTouch = styled(BorderlessButton).attrs(({ disabled, enabled=true })=>({
    borderless: false,

    //disabled
    ...(disabled || !enabled ? {
        enable: false,
        pointerEvents: 'none'
    } : {})
}))`${({ theme, background })=>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 ${theme.padding.medium}px;
    height: ${theme.height.button}px;
    border-radius: ${theme.padding.small}px;
    background: ${background && (theme.background[background] || _.get(theme, background)) || 'transparent'};
`}`

//Text
export const ButtonText = styled.Text`
    color: ${({color, theme})=>theme.color[color] || _.get(theme, color)};
    font-size: ${({theme})=>theme.fontSize.primary}px;
    ${({bold, theme}) => bold ? theme.fontWeight.semibold+';' : ''}
    text-transform: ${Platform.OS=='android' ? 'uppercase' : 'none'};
`