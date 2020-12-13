import styled from 'styled-components/native'

export const Wrap = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: ${({theme})=>theme.padding.medium}px;
`