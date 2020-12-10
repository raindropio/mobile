import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Groups = {
    Wrap: styled(SafeAreaView).attrs({
        edges: ['left', 'right']
    })`
        background: ${({theme})=>theme.background.regular};
        flex: 1;
    `,

    List: styled.ScrollView.attrs({
        nestedScrollEnabled: true,
        scrollEventThrottle: 100
    })`
        flex: 1;
        padding-bottom: 30px
    `
}

export const flexGroupZero = {
    flexGrow: 0
}