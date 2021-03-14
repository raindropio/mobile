import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { draftLoad, draftChange, draftCommit } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'

import Header from 'co/navigation/header'
import TreeContainer from 'co/collections/items'

class BookmarkPathScreen extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:		PropTypes.oneOfType([
							PropTypes.number, //exact id
							PropTypes.string //by link
				]),
				autoCommit:	PropTypes.bool //true by default
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
		if (this.props.status!='loaded' &&
			this.props.status!='new')
			this.props.draftLoad(this.props.route.params._id)	
	}

	onItemPress = ({ _id })=>{
        this.props.draftChange(this.props.route.params._id, { collectionId: _id })

		if (this.props.route.params.autoCommit !== false)
        	this.props.draftCommit(this.props.route.params._id)
			
		this.props.navigation.goBack()
	}

	render() {
		const { item: { collectionId } } = this.props
			
		return (
			<TreeContainer 
				selectedId={collectionId}
				options={this.treeOptions}
				searchAutoFocus={true}
				onItemPress={this.onItemPress} />
		)
	}
}

export default connect(
	() => {
        const getDraftItem = makeDraftItem()
		const getDraftStatus = makeDraftStatus()
    
        return (state, { route: { params={} } })=>({
            item: getDraftItem(state, params._id),
			status: getDraftStatus(state, params._id),
        })
    },
	{ draftLoad, draftChange, draftCommit }
)(BookmarkPathScreen)