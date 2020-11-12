import React from 'react'
import PropTypes from 'prop-types'
import SpaceContainer from 'co/bookmarks/items'
import { connect } from 'react-redux'

import SpaceContext from '../context'
import { Buttons, Button, Title } from 'co/navigation/header'
import SpaceTitle from './title'
import SpaceSearch from './search'

class SpaceScreen extends React.Component {
	static contextType = SpaceContext

	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				spaceId: PropTypes.number
			})
		})
	}

	static options = {
		detachPreviousScreen: false,
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	componentDidMount() {
		this.loadSpace()

		this._focus = this.props.navigation.addListener('focus', this.onScreenFocus)

		this._beforeRemove = this.props.navigation.addListener('beforeRemove', () => {
			this.props.setLastCollection(null)
			this.context.setSpaceId(null)
		})
	}

	componentWillUnmount() {
		this._focus && this._focus()
		this._beforeRemove && this._beforeRemove()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.route.params.spaceId != this.props.route.params.spaceId){
			this.loadSpace()
			this.onScreenFocus()
		}
	}

	loadSpace = ()=>{
		this.props.loadBookmarks(this.props.route.params.spaceId, { sort: this.props.default_sort })
	}

	onScreenFocus = ()=>{
		this.props.setLastCollection(this.props.route.params.spaceId)
		this.context.setSpaceId(this.props.route.params.spaceId)
	}

	onSystemDrop = (data)=>{
		this.props.navigation.navigate('bookmark', {
			screen: 'add',
			params: {
				...data,
				collectionId: parseInt(this.props.route.params.spaceId)
			}
		})
	}

	onShareTap = ()=>
		this.props.navigation.navigate('collection', {
			screen: 'sharing',
			params: { _id: this.props.route.params.spaceId }
		})

	onMoreTap = ()=>
		this.props.navigation.navigate('collection', { screen: 'menu', params: { _id: this.props.route.params.spaceId } })

	render() {
		const { route: { params={} } } = this.props

		return (
			<>
				<Title spaceId={params.spaceId}>
					<SpaceTitle spaceId={params.spaceId} />
				</Title>

				<Buttons spaceId={params.spaceId}>
					{params.spaceId > 0 && (
						<Button icon='user-add' onPress={this.onShareTap} />
					)}

					<Button icon='more' onPress={this.onMoreTap} />
				</Buttons>

				<SpaceContainer 
					key={params.spaceId}
					spaceId={params.spaceId}
					header={<SpaceSearch {...this.props} />}
					onSystemDrop={this.onSystemDrop} />
			</>
		)
	}
}

export default connect(
	state=>({
		default_sort: state.config.raindrops_sort
	}),
	{
		loadBookmarks: require('data/actions/bookmarks').load,
		setLastCollection: require('data/actions/config').setLastCollection
	}
)(SpaceScreen)