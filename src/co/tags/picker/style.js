import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['right', 'left']
})`
    flex: 1;
    background: ${({theme})=>theme.background.regular};
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
`