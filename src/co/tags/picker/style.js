import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Wrap = styled.View`
    flex: 1;
    background: ${({theme})=>theme.background.regular};
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
`

export const SelectedCount = {
    Tap: styled(BorderlessButton)`
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-left: 14px;
        padding-right: 8px;
        min-width: 32px;
        border-radius: 19px;
        height: 38px;
    `,
    Text: styled.Text`
        color: ${({theme})=>theme.color.accent};
        font-size: ${({theme})=>theme.fontSize.secondary}px;
        font-weight: bold;
        margin-right: 4px;
        min-width: 11px;
        text-align: right;
    `
}