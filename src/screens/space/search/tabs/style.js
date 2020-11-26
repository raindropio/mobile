import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'
import SegmentedControl from '@react-native-community/segmented-control'

export const Wrap = styled(SafeAreaView).attrs({
        edges: ['left', 'right']
})`
    background: ${({theme})=>theme.background.regular};
`

export const Control = styled(SegmentedControl).attrs(({ theme })=>({
    appearance: theme.dark ? 'dark' : 'light',
    fontStyle: {
        fontSize: theme.fontSize.quaternary,
    },
    activeFontStyle: {
        fontSize: theme.fontSize.quaternary,
    }
}))`
    margin: ${({theme})=>theme.padding.medium}px;
`