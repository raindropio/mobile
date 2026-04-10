import styled from 'styled-components/native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'

export const Strip = styled(ScrollView).attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    fadingEdgeLength: { end: 64 }
})`${({ theme })=>`
    margin-bottom: ${theme.padding.large}px;
`}`

export const Wrap = styled.View`${({ theme })=>`
    flex-direction: row;
    padding-left: ${theme.padding.medium}px;
    padding-right: ${theme.padding.large}px;
    gap: ${theme.padding.small+theme.padding.micro}px;
`}`

export const SuggestionTap = styled(TouchableOpacity)`${({ theme })=>`
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