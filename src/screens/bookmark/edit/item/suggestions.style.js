import styled from 'styled-components/native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

export const Strip = styled(ScrollView).attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    fadingEdgeLength: 100
})`${({ theme })=>`
    margin-bottom: ${theme.padding.large}px;
`}`

export const Wrap = styled(Animated.View)`${({ theme })=>`
    flex-direction: row;
    padding: 0 ${theme.padding.medium}px;
    gap: ${theme.padding.small+theme.padding.micro}px;
`}`

export const SuggestionTap = styled(RectButton)`${({ theme })=>`
    border-radius: ${theme.padding.medium}px;
`}`

export const SuggestionContent = styled.View`${({ theme, accent })=>`
    align-items: center;
    justify-content: center;
    padding: 0 ${theme.padding.small+theme.padding.micro}px;
    height: ${theme.height.icon+theme.padding.micro}px;
    border-radius: ${theme.padding.medium}px;

    border-width: 1px;
    border-color: ${accent ? `${accent}50` : theme.text.disabled};
    border-style: ${accent ? 'solid' : 'dashed'};

    background: ${accent ? `${accent}30` : 'transparent'};
`}`

export const SuggestionText = styled.Text`${({ theme })=>`
    color: ${theme.text.regular}99;
    font-size: ${theme.fontSize.secondary}px;
`}`