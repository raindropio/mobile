import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'

export const DoneIcon = styled(LottieView).attrs({
    source: require('./done.json'),
    autoPlay: true,
    loop: false,
    duration: 1200
})`
    width: 32px;
    height: 32px;
`