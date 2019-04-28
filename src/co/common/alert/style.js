import styled from 'styled-components/native'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import colors, { themed } from 'co/style/colors'

export const Alert = styled.View`
    padding-horizontal: ${paddingHorizontal}px;
    padding-vertical: 8px;
    flex-direction: row;
    align-items: center;
`

export const Message = styled.Text`
    font-size: ${fontSize.sub}px;
    color: rgba(0,0,0,.7);
    flex: 1;
`

export const Icon = styled.Image`
    margin-right: ${paddingHorizontal}px;
`

//warning
export const Warning = styled(Alert)`
    background-color: ${colors.warning};
`

export const IconWarning = styled(Icon).attrs({
    source: require('assets/images/warning.png')
})`
    tint-color: ${colors.orange};
`

//error
export const Error = styled(Alert)`
    background-color: ${colors.error};
`

export const IconError = styled(Icon).attrs({
    source: require('assets/images/warning.png')
})`
    tint-color: ${colors.red};
`