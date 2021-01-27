import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { query } from 'data/selectors/bookmarks'
import { makeCollection } from 'data/selectors/collections'

import Tint from 'co/collections/item/tint'
import SpaceContext from '../context'
import Header from 'co/navigation/header'
import SpaceTitle from './title'
import SpaceSearch from './search'
import Bookmarks from 'co/bookmarks/items'

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
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0,
		},
		headerTitleContainerStyle: Platform.select({
			ios: {
				maxWidth: '35%'
			}
		})
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
		this.props.loadBookmarks(this.props.route.params.spaceId, { sort: this.props.sort })
	}

	onScreenFocus = ()=>{
		this.props.setLastCollection(this.props.route.params.spaceId)
		this.context.setSpaceId(this.props.route.params.spaceId)
	}

	onCollectionPress = (spaceId)=>
		this.props.navigation.push('browse', { spaceId })

	onSystemDrop = (data)=>
		this.props.navigation.navigate('create', {
			...data,
			collectionId: parseInt(this.props.route.params.spaceId)
		})

	onShareTap = ()=>
		this.props.navigation.navigate('collection', {
			screen: 'sharing',
			params: { _id: this.props.route.params.spaceId }
		})

	onMoreTap = ()=>
		this.props.navigation.navigate('collection', { _id: this.props.route.params.spaceId })

	render() {
		const { route: { params={} }, collection: { collaborators } } = this.props

		return (
			<Tint _id={params.spaceId}>
				<Header.Title spaceId={params.spaceId}>
					<SpaceTitle spaceId={params.spaceId} />
				</Header.Title>

				{params.spaceId > 0 && (
					<Header.Buttons spaceId={params.spaceId}>
						<Tint _id={params.spaceId}>
							<Header.Button 
								icon={collaborators ? 'group-2' : 'user-add'}
								variant={collaborators ? 'fill' : 'line'}
								onPress={this.onShareTap} />

							<Header.Button icon='more' onPress={this.onMoreTap} />
						</Tint>
					</Header.Buttons>
				)}

				<Bookmarks 
					key={params.spaceId}
					spaceId={params.spaceId}
					header={<SpaceSearch {...this.props} />}
					onCollectionPress={this.onCollectionPress}
					onSystemDrop={this.onSystemDrop} />
			</Tint>
		)
	}
}

export default connect(
	()=>{
		const getCollection = makeCollection()

		return (state, { route: {params={}} })=>({
			collection: getCollection(state, params.spaceId),
			sort: query(state, params.spaceId).sort
		})
	},
	{
		loadBookmarks: require('data/actions/bookmarks').load,
		setLastCollection: require('data/actions/config').setLastCollection
	}
)(SpaceScreen)