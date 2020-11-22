import styled from 'styled-components'
import SafeAreaView from 'react-native-safe-area-view'

export const Wrap = styled(SafeAreaView).attrs({
    forceInset: {
        top: 'never'
    }
})`
    background: ${({ theme })=>theme.background.alternative};
    flex-direction: row;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`