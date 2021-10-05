import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['left', 'right', 'top']
})`
    background: ${({theme})=>theme.background.regular};
`

export const Toolbar = styled.View`
    flex-direction: row;
    align-items: center;
`