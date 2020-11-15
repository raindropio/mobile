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

    List: styled.FlatList.attrs({
        keyExtractor: (item)=>item,
        ListFooterComponent: styled.View`height: 30px;`
    })`
        flex: 1;
    `
}

export const flexGroupZero = {
    flexGrow: 0
}