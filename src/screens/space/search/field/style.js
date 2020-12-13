import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAvoidingView } from 'co/native'

export const Wrap = styled(KeyboardAvoidingView)`
    flex: 1;
    background: ${({theme})=>theme.background.regular};
`

export const Header = styled(SafeAreaView).attrs({
    edges: ['top', 'left', 'right']
})`
    background: ${({theme})=>theme.background.regular};
    flex-direction: row;
    align-items: center;
    padding-bottom: ${({theme})=>theme.padding.small}px;
`

export const HeaderSearchWrap = styled.View`
    flex: 1;
`