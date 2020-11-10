import React from 'react'
import styled, { withTheme } from 'styled-components/native'
import { ActivityIndicator } from 'react-native'


export const Wrap = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({theme})=>theme.background.regular};
`

export const Message = styled.Text`
	margin: 16px;
`

export const Loading = withTheme(({ theme }) => (
    <ActivityIndicator 
        animating={true}
        size='large'
        color={theme.text.secondary} />
))