import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const TitleCover = styled.View`
    flex-direction: row;
    margin-top: ${({theme})=>theme.padding.medium}px;
    margin-left: ${({theme})=>theme.padding.medium}px;
    padding-right: ${({theme})=>theme.padding.medium}px;
    padding-bottom: ${({theme})=>theme.padding.medium}px;
    border-color: ${({theme})=>theme.color.border};
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
`

export const TitleExcerpt = styled.View`
    flex-direction: column;
    flex: 1;
    margin-right: ${({theme})=>theme.padding.medium}px;
`