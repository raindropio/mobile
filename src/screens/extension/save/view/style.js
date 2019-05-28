import styled from 'styled-components/native'
import { themed } from 'co/style/colors'
import { fontSize, paddingHorizontal } from 'co/style/constants'

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

export const Body = styled.SafeAreaView`
    width: 100%;
    height: 84px;
    background: ${({color, theme})=>color || (theme.dark ? themed.main() : themed.tintColor())};
    ${({show})=>{
        if (!show)
            return `
                margin-bottom: -84px;
            `
    }}
`

export const Toolbar = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-horizontal: ${paddingHorizontal}px;
`

export const Loading = styled.ActivityIndicator.attrs({
    animating: true
})`
    margin-right: ${paddingHorizontal}px;
`

export const Title = styled.Text.attrs({
    numberOfLines: 1,
    ellipsizeMode: 'tail'
})`
    flex: 1;
    color: white;
    font-size: ${fontSize.title()};
    font-weight: 600;
`