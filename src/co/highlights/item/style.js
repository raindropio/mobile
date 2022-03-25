import styled from 'styled-components/native'
import { Input } from 'co/form'

export const TextWrap = styled.View`
    padding: ${({theme})=>theme.padding.medium-4}px ${({theme})=>theme.padding.medium}px;
    padding-bottom: ${({theme})=>theme.padding.micro}px;
`

export const Note = styled(Input)`
    font-size: ${({theme})=>theme.fontSize.secondary}px;
    flex: 1;
`

export const Buttons = styled.View`
    flex-direction: row;
    align-items: center;
    padding-vertical: ${({theme})=>theme.padding.micro}px;
`

export const Date = styled.Text.attrs({
    numberOfLines: 1
})`
    flex: 1;
    padding-horizontal: ${({theme})=>theme.padding.medium}px;
    font-size: ${({theme})=>theme.fontSize.quaternary}px;
    color: ${({theme})=>theme.text.tertiary};
`