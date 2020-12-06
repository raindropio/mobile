import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['left', 'right', 'bottom']
})`
    flex: 1;
    justify-content: center;
`

export const Header = styled.View`
    flex-direction: row;
    padding: ${({ theme }) => theme.padding.medium}px;
    padding-right: 0;
    padding-bottom: 0;
    align-items: center;
`

export const Title = styled.Text`
    flex: 1;
    font-size: ${({ theme }) => theme.fontSize.h1}px;
    color: ${({ theme }) => theme.text.regular};
    ${({ theme }) => theme.fontWeight.semibold};
`

export const DoneIcon = styled(LottieView).attrs({
    source: require('../assets/done.json'),
    autoPlay: true,
    loop: false
})`
    width: 56px;
    height: 56px;
    align-self: center;
`