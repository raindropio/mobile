import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['bottom', 'left', 'right']
})`
    background: ${({ theme })=>theme.background.alternative};
    flex-direction: row;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`