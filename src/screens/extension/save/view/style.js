import styled from 'styled-components/native'
import SafeAreaView from 'react-native-safe-area-view'

export const Wrap = styled.View`
    flex: 1;
    background: transparent;
`

export const Backdrop = {
    Touch: styled.TouchableWithoutFeedback`
        flex: 1
    `,
    View: styled.View`
        flex: 1;
        background: #00000001;
    `
}

export const Body = styled(SafeAreaView)`
    width: 100%;
    height: 100px;
    background: ${({color, theme})=>color || (theme.dark ? theme.background.regular : theme.color.accent)};
    ${({show})=>{
        if (!show)
            return `
                margin-bottom: -100px;
            `
    }}
`

export const Toolbar = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-horizontal: ${({theme})=>theme.padding.medium}px;
`

export const Loading = styled.ActivityIndicator.attrs({
    animating: true
})`
    margin-right: ${({theme})=>theme.padding.medium}px;
`

export const Title = styled.Text.attrs({
    numberOfLines: 1,
    ellipsizeMode: 'tail'
})`
    flex: 1;
    color: white;
    font-size: ${({theme})=>theme.fontSize.primary}px;
    ${({theme})=>theme.fontWeight.semibold}
`