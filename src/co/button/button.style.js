import _ from 'lodash'
import { Platform, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'

export const ButtonTouch = styled(BorderlessButton).attrs(({ disabled=false, enabled=true })=>({
    borderless: false,
    enabled: disabled ? false : enabled
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

export const ButtonBadge = styled.Text`
    position: absolute;
    background: ${({theme})=>theme.color.danger};
    color: white;
    z-index: 1;
    top: 2px;
    right: 2px;
    border-radius: 10px;
    overflow: hidden;
    min-width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;

    shadow-radius: 5px;
    shadow-opacity: 0.3;
    shadow-offset: 0 3px;
    border-width: 1px;
    border-color: ${({theme})=>theme.background.regular};
    elevation: 5;
`