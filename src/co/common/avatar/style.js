import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import colors, { themed } from 'co/style/colors'

export const Image = styled(FastImage).attrs({
	resizeMode: FastImage.resizeMode.cover
})`
    ${({width})=>`
        width: ${width}px;
        height: ${width}px;
        border-radius: ${width/2||0}px;
    `}
`