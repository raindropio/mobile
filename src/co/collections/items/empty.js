import React from 'react'
import t from 't'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
	EmptyImage
} from 'co/style/empty'

import Button from 'co/button'

const noCollectionsImage = <EmptyImage source={require('./assets/emptyCollections.png')} />

export default ({status, onRefresh})=>{
	switch(status){
		case 'empty':
			return (
				<EmptyView>
					{noCollectionsImage}
					<EmptyTitle>{t.s('welcomeSlide1DD')}</EmptyTitle>
					<EmptySubTitle>{t.s('createFirstCollection')}!</EmptySubTitle>
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