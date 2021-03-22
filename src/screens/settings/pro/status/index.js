import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { isPro } from 'data/selectors/user'
import { links } from 'config'

import { WebView } from 'co/native'

export default function ProStatus({ navigation }) {
	const pro = useSelector(isPro)

	const onShouldStartLoadWithRequest = useCallback(({ url })=>{
		const { pathname } = new URL(url)
		//open buy screen
		if (!pro && pathname.endsWith('/buy')){
			navigation.navigate('buy')
			return false
		}
		return true
	}, [pro])

	return (
		<WebView
			source={{ uri: pro ? links.app.settings.pro : links.help.pro }}
			style={{backgroundColor: 'white'}}
			showsHorizontalScrollIndicator={false}
			onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} />
	)
}