import styled from 'styled-components/native'

export const Wrap = styled.View`
	flex-direction: row;
    align-items: center;
    height: 100%;
    width: 100%;
`

export const Title = styled.Text.attrs({
    ellipsizeMode: 'tail'
})`
    font-size: ${({theme})=>theme.fontSize.head}px;
    ${({theme})=>theme.fontWeight.semibold}
    color: ${({theme})=>theme.text.regular};
    padding-horizontal: ${({theme})=>theme.padding.small}px;
    max-width: 190px;
`