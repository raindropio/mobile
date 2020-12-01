import React from 'react'
import { ActivityIndicator, ProgressView } from 'co/native'
import styled, { withTheme } from 'styled-components/native'

export const Wrap = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const Loading = withTheme(({theme})=>(
    <ActivityIndicator 
        animating={true}
        size='large'
        color={theme.color.accent} />
))

export const Progress = styled(ProgressView)`
    width: 100px;
    margin: 30px;
`