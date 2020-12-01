import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { draftLoad, draftCommit, draftChange, oneReorder } from 'data/actions/collections'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/collections'

import Form from './form'
import Error from 'co/common/alert/error'

class EditCollectionView extends React.PureComponent {
	static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
				_id:    PropTypes.number,
				focus:	PropTypes.string
            })
        })
    }

	static options = {
		title: t.s('collectionEdit')
	}

	onClose = ()=>
		this.props.navigation.goBack()

	componentDidMount() {
		this.props.draftLoad(this.props.route.params._id)
	}

	componentWillUnmount() {
		this.props.draftCommit(this.props.route.params._id)
	}

	componentDidUpdate(prevProps) {
		const { status } = this.props

		if (status != prevProps.status) {
			if (status == 'errorSaving')
				return Alert.alert(t.s('saveError'))
		}
	}

	onChange = (obj)=>{
		this.props.draftChange(this.props.item._id, obj)

		if (obj.parentId)
			this.props.oneReorder(this.props.item._id, {to: obj.parentId})
		
		if (typeof obj.title == 'undefined')
			this.props.draftCommit(this.props.item._id)
	}
	
	render() {
		const { route: { params={} }, status, item, ...etc } = this.props

		switch(status){
			case 'error':
				return <Error />

			default:
				return (
					<Form 
						{...params}
						{...etc}
						{...item}
						onSave={this.onClose}
						onChange={this.onChange} />
				)
		}
	}
}

export default connect(
	() => {
		const getDraftItem = makeDraftItem()
		const getDraftStatus = makeDraftStatus()
	
		return (state, { route: { params={} } })=>{
			return {
				status: getDraftStatus(state, params._id),
				item: getDraftItem(state, params._id)
			}
		}
	},
	{ draftLoad, draftCommit, draftChange, oneReorder }
)(EditCollectionView)