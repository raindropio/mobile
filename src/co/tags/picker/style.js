import styled from 'styled-components/native'
import SafeAreaView from 'react-native-safe-area-view'

export const Wrap = styled(SafeAreaView)`
    flex: 1;
    background: ${({theme})=>theme.background.regular};
`