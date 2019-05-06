import styled from 'styled-components/native'
import colors, {themed} from 'co/style/colors'

export const Wrap = styled.View`
    flex: 1;
    ${({floating})=>floating?`
        position:absolute;
        left:0;top:0;right:0;bottom:0;
        z-index: 1;
    `:null}
`

export const Body = styled.View.attrs(props=>props.floating ? {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 15},
    shadowRadius: 10,
    shadowOpacity: .15
} : {})`
    flex: 1;
    background: ${themed.main};
    ${({floating})=>floating?`
        height: 50%;
    `:null}
`

export const Backdrop = styled.TouchableOpacity.attrs({
    activeOpacity: 1
})`
    flex: 1;
    background: #00000020;
`

export const Icons = {
    article: styled.Image.attrs({
        source: require('assets/images/article.png')
    })`tint-color: ${colors.orange};`,

    image: styled.Image.attrs({
        source: require('assets/images/image.png')
    })`tint-color: ${colors.green};`,

    video: styled.Image.attrs({
        source: require('assets/images/video.png')
    })`tint-color: ${colors.purple};`,

    important: styled.Image.attrs({
        source: require('assets/images/starFilled.png')
    })`tint-color: ${colors.red};`,

    broken: styled.Image.attrs({
        source: require('assets/images/broken.png')
    })`tint-color: ${colors.asphalt};`,

    tag: styled.Image.attrs({
        source: require('assets/images/tags.png')
    })``
}