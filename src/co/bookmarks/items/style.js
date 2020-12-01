import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FlatList from 'co/list/flat/basic'
import { getListViewParams } from 'modules/view'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['left', 'right']
})`
    background: ${({theme})=>theme.background.regular};
    flex: 1;
`

const ItemSeparatorComponent = styled.View`
    height: ${StyleSheet.hairlineWidth}px;
    background-color: ${({theme})=>theme.color.border};
    margin-left: ${({theme})=>theme.padding.medium}px;
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