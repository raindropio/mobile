import React from 'react'
import Module from './module'
import Error from 'co/common/alert/error'
import { Wrap, Loading, Progress } from './style'

class BookmarkAdd extends React.Component {
	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status) {
			switch(this.props.status) {
				case 'removed':
				case 'loaded':
					/*if (this.props.item)
						Navigation.replace(this.props, 'bookmark/edit', {
							_id: this.props.item._id,
							title: this.props.status == 'loaded' ? t.s('saveSuccess') : ''
						})
					else*/
					this.props.navigation.goBack()
					this.props.navigation.navigate('browse', {
						spaceId: this.props.item.collectionId
					})
					this.props.navigation.navigate('bookmark', {
						_id: this.props.item._id
					})
				break
			}
		}
	}

	render() {
		let content = null
		switch(this.props.status) {
			case 'error':
				content = <Error message={this.props.message} />
				break

			default:
				if (this.props.progress)
					content = <Progress progress={this.props.progress} />
				else
					content = <Loading />
		}

		return (
			<Wrap>
				{content}
			</Wrap>
		)
	}
}

export default Module(BookmarkAdd)