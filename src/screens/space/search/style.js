import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['top']
})`
    flex: 1;
    flex-direction: column;
    background: ${({theme})=>theme.background.regular};
`