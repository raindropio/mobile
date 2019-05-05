import React from 'react'
import t from 't'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
	EmptyViewSpace,
	EmptyImage
} from 'co/style/empty'
import { ButtonAction } from 'co/common/button'

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
					default:
						return (
							<EmptyView>
								{noBookmarksImage}
								<EmptyTitle>{t.s('collectionEmpty')}</EmptyTitle>
								<EmptySubTitle>{t.s('welcomeSlide1D')}</EmptySubTitle>
								<EmptySubTitle />

								<ButtonAction onPress={this.props.onAddPress}>{t.s('addBookmark')}</ButtonAction>
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