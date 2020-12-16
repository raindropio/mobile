import styled from 'styled-components/native'

export const Alert = styled.View`
    padding-left: ${({theme})=>theme.padding.medium}px;
    padding-vertical: ${({theme})=>theme.padding.small}px;
    flex-direction: column;
`

export const Wrap = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Message = styled.Text`
    flex: 1;
    font-size: ${({theme})=>theme.fontSize.secondary}px;
    color: rgba(0,0,0,.7);
    margin: ${({theme})=>theme.padding.small}px;
`

export const Icon = styled.Image`
    margin-right: ${({theme})=>theme.padding.medium}px;
`

//warning
export const Warning = styled(Alert)`
    background-color: ${({theme})=>theme.background.warning};
`

//error
export const Error = styled(Alert)`
    background-color: ${({theme})=>theme.background.danger};
`

//info
export const Info = styled(Alert)`
    background-color: ${({theme})=>theme.background.info};
`