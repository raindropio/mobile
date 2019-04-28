import React from 'react'
import t from 't'
import helpExtension from 'co/bookmarks/actions/helpExtension'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
	EmptyViewSpace,
	EmptyImage
} from 'co/style/empty'

import {
	ButtonLink
} from 'co/common/button'

const noBookmarksImage = <EmptyImage source={require('assets/images/noBookmarks.png')} />

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

				if (parseInt(this.props.spaceId)==-99)
					emptyStatus = 'trash'
				else if (parseInt(this.props.spaceId)<=0)
					emptyStatus = 'noBookmarks'
				if (!searchEmpty)
					emptyStatus = 'search'

				switch(emptyStatus){
					case 'trash':
						return (
							<EmptyView>
								<EmptyTitle>{t.s('trashEmpty')}</EmptyTitle>
							</EmptyView>
						)
					case 'search':
						return (
							<EmptyView>
								<EmptyTitle>{t.s('nothingFound')}</EmptyTitle>
							</EmptyView>
						)
					case 'noBookmarks':
						return (
							<EmptyView>
								{noBookmarksImage}
								<EmptyTitle>{t.s('noBookmarks')}</EmptyTitle>
								<EmptySubTitle>{t.s('welcomeSlide1D')}</EmptySubTitle>

								<ButtonLink onPress={helpExtension}>{t.s('addBookmark')}</ButtonLink>
							</EmptyView>
						)
					default:
						return (
							<EmptyView>
								{noBookmarksImage}
								<EmptyTitle>{t.s('collectionEmpty')}</EmptyTitle>
								<EmptySubTitle>{t.s('welcomeSlide1D')}</EmptySubTitle>

								<ButtonLink onPress={helpExtension}>{t.s('addBookmark')}</ButtonLink>
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
						<EmptyTitle>{t.s('removeCollectionSuccess')}</EmptyTitle>
					</EmptyView>
				)

			default:
				return null
		}
	}
}

export default SpaceEmpty