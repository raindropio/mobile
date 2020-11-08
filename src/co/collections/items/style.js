import styled from 'styled-components/native'
import SafeAreaView from 'react-native-safe-area-view'

export const Wrap = styled(SafeAreaView).attrs({
    forceInset: {
        bottom: 'never'
    }
})`
    background: ${({theme})=>theme.background.regular};
    flex: 1;
`