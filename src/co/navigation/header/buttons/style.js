import _ from 'lodash'
import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Wrap = styled.View`
    flex-direction: row;
    height: 100%;
`

//Button itself
export const ButtonTouch = styled(BorderlessButton).attrs(({ disabled })=>({
    enabled: !disabled,
    borderless: false
}))`
    align-items: center;
    justify-content: center;
`
export const ButtonWrap = styled.View`
    align-items: center;
    justify-content: center;
    padding: 0 12px;
`

//Text
export const ButtonText = styled.Text`
    color: ${({color, theme})=>theme.color[color] || _.get(theme, color)};
    font-size: ${({theme})=>theme.fontSize.primary}px;
    ${({bold, theme}) => bold ? theme.fontWeight.semibold+';' : ''}
`