import styled from 'styled-components/native'
import FlatList from 'co/list/flat/basic'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['right', 'left']
})`
    flex: 1;
`
export const List = styled(FlatList)`
    flex: 1;
    padding-vertical: ${({theme})=>theme.padding.medium}px;
`