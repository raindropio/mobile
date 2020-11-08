import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { Alert } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/collections'

import Form from './form'
import Error from 'co/common/alert/error'
import LoadingView from 'co/common/loadingView'
import { ButtonLink } from 'co/common/button'

class EditCollectionView extends React.PureComponent {
	static propTypes = {
        _id:    PropTypes.number,
        focus:  PropTypes.string
    }

	onClose = ()=>{
		this.props.navigation.goBack()
	}

	componentDidMount() {
		this.props.actions.collections.draftLoad(this.props._id)
	}

	componentWillUnmount() {
		this.props.actions.collections.draftCommit(this.props.item._id)
	}

	componentDidUpdate(prevProps) {
		const { status } = this.props

		if (status != prevProps.status) {
			if (status == 'errorSaving')
				return Alert.alert(t.s('saveError'))
		}
	}

	onChange = (obj)=>{
		this.props.actions.collections.draftChange(this.props.item._id, obj)

		if (obj.parentId)
			this.props.actions.collections.oneReorder(this.props.item._id, {to: obj.parentId})
		
		if (typeof obj.title == 'undefined')
			this.props.actions.collections.draftCommit(this.props.item._id)
	}
	
	render() {
		const { status, item } = this.props
		const loading = (status=='loading'||status=='saving')

		switch(status){
			case 'error':
				return <Error />

			default:
				return (
					<LoadingView loading={loading} pointerEvents={loading ? 'none' : 'auto'}>
                        <Form 
                            {...item}
                            focus={this.props.focus}
                            navigation={this.props.navigation}
                            isModal={this.props.isModal}
                            onSave={this.onClose}
                            onChange={this.onChange} />
					</LoadingView>
				)
		}
	}
}

const makeMapStateToProps = () => {
	const 
		getDraftItem = makeDraftItem(),
		getDraftStatus = makeDraftStatus()

	const mapStateToProps = (state, { _id })=>{
		const item = getDraftItem(state, _id)

		return {
			status: getDraftStatus(state, _id),
			item: item
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			collections: bindActionCreators(collectionsActions, dispatch)
		}
	})
)(EditCollectionView)