import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { draftLoad, draftChange, draftCommit } from 'data/actions/bookmarks'
import { makeDraftItem } from 'data/selectors/bookmarks'

import { Buttons, Cancel } from 'co/navigation/header'
import TreeContainer from 'co/collections/items'

class BookmarkPathScreen extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:    PropTypes.number
			})
		})
	}

	static options = ({ route: { params={} } })=>({
		title: params.title || t.s('bookmark') + ' ' + t.s('location').toLowerCase(),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
    })

	treeOptions = {
        hideIds: [0]
	}
	
	componentDidMount () {
		this.props.draftLoad(this.props.route.params._id)	
	}

	onItemPress = ({ _id })=>{
        this.props.draftChange(this.props.route.params._id, { collectionId: _id })
        this.props.draftCommit(this.props.route.params._id)
		this.props.navigation.goBack()
	}

	render() {
		const { item: { collectionId }, navigation } = this.props
			
		return (
			<>
				<Buttons left>
					<Cancel onPress={navigation.goBack} />
				</Buttons>
				<Buttons />

				<TreeContainer 
					selectedId={collectionId}
					options={this.treeOptions}
					searchAutoFocus
					onItemPress={this.onItemPress} />
			</>
		)
	}
}

export default connect(
	() => {
        const getDraftItem = makeDraftItem()
    
        return (state, { route: { params={} } })=>({
            item: getDraftItem(state, params._id)
        })
    },
	{ draftLoad, draftChange, draftCommit }
)(BookmarkPathScreen)