import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Window = styled(SafeAreaView).attrs({
    edges: ['bottom']
})`
    flex: 1;
`

export const Scroll = styled.ScrollView.attrs({
    centerContent: true,
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})`
    flex: 1;
`

export const Message = styled.Text`
    font-size: ${({theme})=>theme.fontSize.secondary}px;
    color: ${({theme})=>theme.text.regular};
    margin: ${({theme})=>theme.padding.medium}px;
`

export const IconWrap = styled.View`
    background: ${({theme})=>theme.color.danger}15;
    border-radius: 50px;
    padding: 4px;
`