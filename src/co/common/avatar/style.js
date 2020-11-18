import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

export const Image = styled(FastImage).attrs({
	resizeMode: FastImage.resizeMode.cover
})`
    ${({width})=>`
        width: ${width}px;
        height: ${width}px;
        border-radius: ${width/2||0}px;
    `}
    margin: 2px;
`