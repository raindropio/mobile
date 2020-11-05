import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

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
    shadowOpacity: .1,
    elevation: 12
} : {})`
    flex: 1;
    background: ${({theme})=>theme.background.regular};
    
`

export const Backdrop = styled(RectButton).attrs({
    activeOpacity: 1
})`
    flex: .7;
    background: #00000020;
`

export const Icons = {
    article: styled.Image.attrs({
        source: require('assets/images/article.png')
    })`tint-color: ${({theme})=>theme.color.article};`,

    image: styled.Image.attrs({
        source: require('assets/images/image.png')
    })`tint-color: ${({theme})=>theme.color.image};`,

    video: styled.Image.attrs({
        source: require('assets/images/video.png')
    })`tint-color: ${({theme})=>theme.color.video};`,

    audio: styled.Image.attrs({
        source: require('assets/images/audio.png')
    })`tint-color: ${({theme})=>theme.color.audio};`,

    document: styled.Image.attrs({
        source: require('assets/images/document.png')
    })`tint-color: ${({theme})=>theme.color.document};`,

    important: styled.Image.attrs({
        source: require('assets/images/starFilled.png')
    })`tint-color: ${({theme})=>theme.color.important};`,

    broken: styled.Image.attrs({
        source: require('assets/images/broken.png')
    })`tint-color: ${({theme})=>theme.color.broken};`,

    tag: styled.Image.attrs({
        source: require('assets/images/tags.png')
    })`tint-color: ${({theme})=>theme.color.tag};`,
}