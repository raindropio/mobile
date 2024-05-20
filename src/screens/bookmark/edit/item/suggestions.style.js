import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

export const Wrap = styled(Animated.ScrollView).attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    fadingEdgeLength: 100
})`${({ theme })=>`
    padding: 0 ${theme.padding.medium-theme.padding.micro}px;
    margin-bottom: ${theme.padding.large}px;
`}`

export const SuggestionTap = styled(RectButton)`${({ theme })=>`
    margin: 0 ${theme.padding.micro}px;
    border-radius: ${theme.padding.medium}px;
`}`

export const SuggestionContent = styled.View.attrs({

})`${({ theme, accent })=>`
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