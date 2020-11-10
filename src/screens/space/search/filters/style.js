import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Wrap = styled.View`
    flex: 1;
    ${({floating})=>floating?`
        position:absolute;
        left:0;top:0;right:0;bottom:0;
        z-index: 1;
    `:null}
`

export const Body = styled.View.attrs(props=>props.floating ? {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 15},
    shadowRadius: 10,
    shadowOpacity: .1,
    elevation: 12
} : {})`
    flex: 1;
    background: ${({theme})=>theme.background.regular};
    
`

export const Backdrop = styled(RectButton).attrs({
    activeOpacity: 1
})`
    flex: .7;
    background: #00000020;
`

export const Icons = {
    article:    { name: 'article' },
    image:      { name: 'image' },
    video:      { name: 'video' },
    audio:      { name: 'mv' },
    document:   { name: 'file-text' },
    important:  { name: 'heart-3' },
    broken:     { name: 'ghost' },
    tag:        { name: 'hashtag' },
}