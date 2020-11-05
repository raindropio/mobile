import styled from 'styled-components/native'

export const Alert = styled.View`
    padding-horizontal: ${({theme})=>theme.padding.medium}px;
    padding-vertical: 8px;
    flex-direction: row;
    align-items: center;
`

export const Message = styled.Text`
    font-size: ${({theme})=>theme.fontSize.secondary}px;
    color: rgba(0,0,0,.7);
    flex: 1;
`

export const Icon = styled.Image`
    margin-right: ${({theme})=>theme.padding.medium}px;
`

//warning
export const Warning = styled(Alert)`
    background-color: ${({theme})=>theme.background.warning};
`

export const IconWarning = styled(Icon).attrs({
    source: require('assets/images/warning.png')
})`
    tint-color: ${({theme})=>theme.color.warning};
`

//error
export const Error = styled(Alert)`
    background-color: ${({theme})=>theme.background.danger};
`

export const IconError = styled(Icon).attrs({
    source: require('assets/images/warning.png')
})`
    tint-color: ${({theme})=>theme.color.danger};
`