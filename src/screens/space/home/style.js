import styled from 'styled-components'
import SafeAreaView from 'react-native-safe-area-view'

export const Groups = {
    Wrap: styled(SafeAreaView).attrs({
        forceInset: {
            vertical: 'never'
        }
    })`
        background: ${({theme})=>theme.background.regular};
        flex: 1;
    `,

    List: styled.ScrollView.attrs({
        nestedScrollEnabled: true,
        scrollEventThrottle: 10
    })`
        flex: 1;
        padding-bottom: 30px
    `
}

export const flexGroupZero = {
    flexGrow: 0
}