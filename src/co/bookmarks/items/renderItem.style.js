import styled from 'styled-components/native'

export const ColumnsList = styled.FlatList.attrs(({theme})=>({
    columnWrapperStyle: {
        paddingHorizontal: theme.padding.small
    }
}))``