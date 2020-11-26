import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
        edges: ['left', 'right']
})`
    background: ${({theme})=>theme.background.regular};
    ${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`

export const Footer = styled.View`
    height: 32px;
`