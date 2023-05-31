import styled from 'styled-components/native'

export const TitleCover = styled.View`
    flex-direction: row;
    padding: ${({theme})=>theme.padding.medium}px;
    padding-top: 0;
`

export const TitleExcerpt = styled.View`
    flex-direction: column;
    flex: 1;
    margin-left: ${({theme})=>theme.padding.medium}px;
`