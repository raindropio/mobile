import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled, { withTheme } from 'styled-components/native'
import { themed } from 'co/style/colors'
import ProgressBar from 'co/common/progressBar'

export const Wrap = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const Loading = withTheme((props)=>(
    <ActivityIndicator 
        animating={true}
        size='large'
        color={themed.tintColor(props)} />
))

export const Progress = styled(ProgressBar)`
    width: 100px;
    margin: 30px;
`