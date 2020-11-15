import styled from 'styled-components'
import SafeAreaView from 'react-native-safe-area-view'

export const Wrap = styled(SafeAreaView).attrs({
    forceInset: {
        top: 'never'
    }
})`
    background: ${({ theme })=>theme.color.accent}08;
    flex-direction: row;
`