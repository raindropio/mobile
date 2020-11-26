import styled from 'styled-components/native'
import _ from 'lodash-es'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Button = styled(BorderlessButton)`
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 64px;
`

export const Label = styled.Text.attrs({
    numberOfLines: 1
})`
    color: ${({color, theme})=>_.get(theme, color)};
    font-size: ${({theme})=>theme.fontSize.quaternary}px;
    margin-top: 2px;
    padding: 0 8px;
`