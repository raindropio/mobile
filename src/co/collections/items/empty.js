import React, { useCallback } from 'react'
import t from 't'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
	EmptyImage
} from 'co/style/empty'

import Button from 'co/button'

const noCollectionsImage = <EmptyImage source={require('./assets/emptyCollections.png')} />

export default ({ status, onRefresh, onItemPress, navigation })=>{
	const onAdd = useCallback(()=>{
		navigation.navigate('collection', {
			screen: 'add', 
			params: {
				onSuccess: onItemPress
			}
		})
	}, [onItemPress])

	switch(status){
		case 'empty':
			return (
				<EmptyView>
					{noCollectionsImage}
					<EmptyTitle>{t.s('myCollections')}</EmptyTitle>
					<EmptySubTitle>{t.s('welcomeSlide1DD')}</EmptySubTitle>
					<EmptySubTitle />

					<Button 
						onPress={onAdd} 
						bold
						title={t.s('createFirstCollection')} />
				</EmptyView>
			)

		case 'error':
			return (
				<EmptyView>
					<EmptyTitle>{t.s('server')}</EmptyTitle>
					<EmptySubTitle>{t.s('noInternetError')}</EmptySubTitle>

					<Button onPress={onRefresh} title={t.s('tryAgain')} />
				</EmptyView>
			)

		default:
			return null
	}
}