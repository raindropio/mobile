import styled from 'styled-components/native'

export const List = styled.FlatList.attrs({
    horizontal: true
})`
    background: ${({theme})=>theme.background.regular};
    padding-horizontal: ${({theme}) => theme.padding.small + theme.padding.micro}px;
    opacity: ${({status})=>status=='loaded'?1:0};
`