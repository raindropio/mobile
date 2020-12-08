import styled from 'styled-components/native'

export const Image = styled.Image`
    ${({width})=>`
        width: ${width}px;
        height: ${width}px;
        border-radius: ${width/2||0}px;
    `}
    margin: 2px;
`