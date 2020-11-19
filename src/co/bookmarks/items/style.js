import styled from 'styled-components/native'
import SafeAreaView from 'react-native-safe-area-view'
import FlatList from 'co/list/flat/basic'
import ItemSeparatorComponent from 'co/style/separator'
import { getListViewParams } from 'modules/view'

export const Wrap = styled(SafeAreaView).attrs({
    forceInset: {
        vertical: 'never'
    }
})`
    background: ${({theme})=>theme.background.regular};
    flex: 1;
`

export const List = styled(FlatList).attrs(({ numColumns, theme })=>({
    ...getListViewParams(100),

    //grid/masonry specific
    ...(numColumns > 1 ? {
        columnWrapperStyle: {
            paddingHorizontal: theme.padding.small
        }
    } : 
    //list specific
    {
        ItemSeparatorComponent
    })
}))`
    flex: 1;
`