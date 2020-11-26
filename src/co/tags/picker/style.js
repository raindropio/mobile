import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BorderlessButton } from 'react-native-gesture-handler'
import { TabView } from 'react-native-tab-view'

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['left', 'right']
})`
    flex: 1;
    background: ${({theme})=>theme.background.regular};
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
`

export const SelectedCount = {
    Tap: styled(BorderlessButton)`
        flex-direction: row;
        background: ${({theme})=>theme.color.accent};
        margin-right: ${({theme})=>theme.padding.medium}px;
        align-items: center;
        justify-content: center;
        padding-left: 14px;
        padding-right: 8px;
        min-width: 32px;
        border-radius: 19px;
        height: 38px;
    `,
    Text: styled.Text`
        color: ${({theme})=>theme.background.regular};
        font-size: ${({theme})=>theme.fontSize.secondary}px;
        font-weight: bold;
        margin-right: 4px;
        min-width: 11px;
        text-align: right;
    `
}

export const Tabs = styled(TabView).attrs({
    renderTabBar: ()=>null
})``