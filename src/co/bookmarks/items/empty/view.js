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
import LoadingIndicator from 'co/common/loadingIndicator'

class SpaceEmpty extends React.Component {
	render() {
		const { status, searchEmpty, } = this.props

		switch(status){
			case 'empty':{
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
								<EmptyImageIcon name='delete-bin' variant='fill' size='32' />
								<EmptyTitle>{t.s('trashEmpty')}</EmptyTitle>
							</EmptyView>
						)
					case 'search':
						return (
							<EmptyView>
								<EmptyImageIcon name='bookmark' size='32' />
								<EmptyTitle>{t.s('noBookmarks')}</EmptyTitle>
							</EmptyView>
						)
					default:
						return (
							<EmptyView>
								<EmptyImage source={require('./assets/noBookmarks.png')} />
								<EmptyTitle>{t.s(_id>0 ? 'collectionEmpty' : 'noBookmarks')}</EmptyTitle>
								<EmptySubTitle>{t.s('welcomeSlide1D')}</EmptySubTitle>
							</EmptyView>
						)
				}
			}

			case 'error':
				return (
					<EmptyView>
						<EmptyImageIcon name='error-warning' size='32' />
						<EmptyTitle>{t.s('server')}</EmptyTitle>
						<EmptySubTitle>{t.s('noInternetError')}</EmptySubTitle>

						<EmptyViewSpace/>
					</EmptyView>
				)

			case 'notFound':
				return (
					<EmptyView>
						<EmptyImageIcon name='delete-bin' variant='fill' size='32' />
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