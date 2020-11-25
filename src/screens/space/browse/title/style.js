import styled from 'styled-components/native'

export const Wrap = styled.View`
	flex-direction: row;
    align-items: center;
    height: 100%;
    max-width: 80%;
`

export const Title = styled.Text.attrs({
    ellipsizeMode: 'tail'
})`
    font-size: ${({theme})=>theme.fontSize.head}px;
    ${({theme})=>theme.fontWeight.semibold}
    color: ${({theme})=>theme.text.regular};
    padding-left: ${({theme})=>theme.padding.small}px;
`