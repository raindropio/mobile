import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'

export const Wrap = styled.View`
    flex: 1;
    justify-content: center;
`

export const DoneIcon = styled(LottieView).attrs(({theme})=>({
    source: require('../assets/done.json'),
    autoPlay: true,
    loop: false
}))`
    width: 56px;
    height: 56px;
    align-self: center;
`