import styled from 'styled-components/native'
import SegmentedControl from '@react-native-community/segmented-control'

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
    margin-top: ${({theme})=>theme.padding.small}px;
`