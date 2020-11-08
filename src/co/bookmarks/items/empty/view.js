import React from 'react'
import t from 't'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
	EmptyViewSpace,
	EmptyImage,
	EmptyImageIcon
} from 'co/style/empty'
import { ButtonAction } from 'co/common/button'
import LoadingIndicator from 'co/common/loadingIndicator'

const noBookmarksImage = <EmptyImage source={require('assets/images/noBookmarks.png')} />
const emptyCollections = <EmptyImageIcon source={require('assets/images/trash.png')} />

class SpaceEmpty extends React.Component {
	render() {
		const {
			status,
			searchEmpty,
			onRefresh
		} = this.props

		switch(status){
			case 'empty':
				var emptyStatus;
				const _id = parseInt(this.props.spaceId)

				if (_id==-99)
					emptyStatus = 'trash'
				else if (_id<=0)
					emptyStatus = 'noBookmarks'
				if (!searchEmpty)
					emptyStatus = 'search'

				switch(emptyStatus){
					case 'trash':
						return (
							<EmptyView>
								{emptyCollections}
								<EmptyTitle>{t.s('trashEmpty')}</EmptyTitle>
							</EmptyView>
						)
					case 'search':
						return (
							<EmptyView>
								<EmptyTitle>{t.s('nothingFound')}</EmptyTitle>
							</EmptyView>
						)
					default:
						return (
							<EmptyView>
								{noBookmarksImage}
								<EmptyTitle>{t.s(_id>0 ? 'collectionEmpty' : 'noBookmarks')}</EmptyTitle>
								<EmptySubTitle>{t.s('welcomeSlide1D')}</EmptySubTitle>
							</EmptyView>
						)
				}

			case 'error':
				return (
					<EmptyView>
						<EmptyTitle>{t.s('server')}</EmptyTitle>
						<EmptySubTitle>{t.s('noInternetError')}</EmptySubTitle>

						<EmptyViewSpace/>
					</EmptyView>
				)

			case 'notFound':
				return (
					<EmptyView>
						{emptyCollections}
						<EmptyTitle>{t.s('removeCollectionSuccess')}</EmptyTitle>
						<EmptySubTitle>{t.s('or')} {t.s('nothingFound').toLowerCase()}</EmptySubTitle>
					</EmptyView>
				)

			default:
				return (
					<EmptyView>
						<LoadingIndicator />
					</EmptyView>
				)
		}
	}
}

export default SpaceEmpty