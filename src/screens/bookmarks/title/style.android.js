import styled from 'styled-components/native'
import FullWidthView from 'co/common/fullWidthView'
import { fontSize } from 'co/style/constants'
import { themed } from 'co/style/colors'

export const Tap = styled.TouchableOpacity`
    flex: 1;
`

export const Wrap = styled(FullWidthView).attrs({
    cut: 200,
    customStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})``

export const Title = styled.Text.attrs({
    ellipsizeMode: 'tail'
})`
    flex-shrink: 1;
    padding-left: ${({margin})=>margin?10:0}px;
    font-size: ${fontSize.topBar}px;
    color: ${themed.inverted};
`

export const ArrowIcon = styled.Image.attrs({
    source: require('assets/images/details.png')
})`
    tint-color: ${themed.invertedDark};
`

export const CollaboratorsIcon = styled.Image.attrs({
    source: require('assets/images/collaboratorsStatus.png')
})`
    margin-left: 4px;
    tint-color: ${themed.invertedDark};
`