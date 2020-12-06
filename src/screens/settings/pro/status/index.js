import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { isPro } from 'data/selectors/user'
import { WebView } from 'co/native'

export default function ProStatus({ navigation }) {
	const pro = useSelector(isPro)

	const onShouldStartLoadWithRequest = useCallback(({ url })=>{
		//open buy screen
		if (!pro && url.endsWith('/buy')){
			navigation.navigate('buy')
			return false
		}
		return true
	}, [pro])

	return (
		<WebView
			source={{ uri: pro ? 'https://app.raindrop.io/settings/pro' : 'https://raindrop.io/pro?frame=1' }}
			showsHorizontalScrollIndicator={false}
			onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} />
	)
}