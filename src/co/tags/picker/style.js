import React from 'react'
import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { TabView } from 'react-native-tab-view'

export const Wrap = styled.SafeAreaView.attrs({
    forceInset: {
        vertical: 'never'
    }
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
        margin-left: ${({theme})=>theme.padding.medium}px;
        align-items: center;
        justify-content: center;
        padding-horizontal: 12px;
        min-width: 32px;
        border-radius: 5px;
        height: 38px;
    `,
    Text: styled.Text`
        color: ${({theme})=>theme.background.regular};
        font-size: ${({theme})=>theme.fontSize.secondary}px;
        font-weight: bold;
        margin-left: 8px;
    `
}

export const Tabs = styled(TabView).attrs({
    renderTabBar: ()=>null
})``