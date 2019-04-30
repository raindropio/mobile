import styled from 'styled-components/native'
import colors from 'co/style/colors'

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
    })`tint-color: ${colors.asphalt};`
}