import styled from 'styled-components/native'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import { themed } from 'co/style/colors'

export const Tap = styled.TouchableOpacity`
    flex: 1;
`

export const Wrap = styled.View`
	flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding-left: ${paddingHorizontal}px;
`

export const Title = styled.Text.attrs({
    ellipsizeMode: 'tail'
})`
    font-size: ${fontSize.topBar()}px;
    color: ${themed.inverted};
    font-weight: 600;
    padding-left: 10px;
    max-width: 150px;
`

export const ArrowIcon = styled.Image.attrs({
    source: require('assets/images/details.png')
})`
    tint-color: ${themed.invertedDark};
`