import _ from 'lodash'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'

export const ButtonTouch = styled(BorderlessButton).attrs(({ disabled, enabled=true })=>({
    borderless: false,

    //disabled
    ...(disabled || !enabled ? {
        enabled: false,
        pointerEvents: 'none'
    } : {})
}))`${({ theme, background, vertical })=>`
    flex-direction: ${vertical ? 'column' : 'row'};
    align-items: center;
    justify-content: center;
    padding: 0 ${theme.padding.medium}px;
    height: ${theme.height.button + (vertical ? theme.padding.medium*2 : 0)}px;
    border-radius: ${theme.padding.small}px;
    background: ${background && (theme.background[background] || _.get(theme, background)) || 'transparent'};
`}`

//Text
export const ButtonText = styled.Text.attrs({
    numberOfLines: 1
})`
    color: ${({color, theme})=>theme.color[color] || _.get(theme, color)};
    font-size: ${({theme, fontSize})=>theme.fontSize[fontSize]}px;
    ${({bold, theme}) => bold ? theme.fontWeight.semibold+';' : ''}
    text-transform: ${Platform.OS=='android' ? 'uppercase' : 'none'};
`

export const ButtonGap = styled.View`
    width: ${({theme, vertical})=>vertical ? 0 : theme.padding.small}px;
    height: ${({theme, vertical})=>vertical ? theme.padding.micro : 0}px;
`