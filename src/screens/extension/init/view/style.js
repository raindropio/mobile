import React from 'react'
import styled, { withTheme } from 'styled-components/native'
import { ActivityIndicator } from 'react-native'
import { themed } from 'co/style/colors'

export const Wrap = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${themed.main};
`

export const Message = styled.Text`
	margin: 16px;
`

export const Loading = withTheme(props => (
    <ActivityIndicator 
        animating={true}
        size='large'
        color={themed.invertedMedium(props)} />
))