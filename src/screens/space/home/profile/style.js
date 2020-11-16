import styled from 'styled-components/native'

export const Wrap = styled.View`
    flex-direction: row;
    align-items: center;
    height: 100%;
`

export const Text = styled.Text`
    font-size: ${({theme})=>theme.fontSize.head}px;
    ${({theme})=>theme.fontWeight.semibold}
    color: ${({theme})=>theme.text.regular};
    margin-left: ${({theme})=>theme.padding.medium}px;
`