import styled from 'styled-components/native'

export const Wrap = styled.View`
    align-items: center;
    justify-self: center;
`

export const Body = styled.View`
    width: 270px;
    align-items: center;
`

export const LeadImage = styled.Image.attrs({
    source: require('./assets/empty.png')
})`
    margin-bottom: 30px;
`