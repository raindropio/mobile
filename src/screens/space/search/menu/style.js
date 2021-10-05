import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['left', 'right', 'bottom']
})`
    flex: 1;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: ${({theme})=>theme.background.regular};
`