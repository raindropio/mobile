import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { Alert, Text } from 'react-native'
import { relative as relativeDate } from 'modules/format/date'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import { makeDraftItem, makeDraftStatus, getSharingCount } from 'data/selectors/collections'

import { ScrollForm } from 'co/style/form'
import Form from './form'
import Settings from './settings'
import Error from 'co/common/alert/error'
import LoadingView from 'co/common/loadingView'
import { ButtonLink } from 'co/common/button'

class EditCollectionForm extends React.PureComponent {
	static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number
            })
        })
    }

	static options = {
		title: t.s('collection'),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	onClose = ()=>{
		this.props.navigation.goBack()
	}

	componentDidMount() {
		this.props.actions.collections.draftLoad(this.props.route.params._id)
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

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'done':
				this.onClose()
			break
		}
	}

	onChange = (obj)=>{
		this.props.actions.collections.draftChange(this.props.item._id, obj)

		if (obj.parentId)
			this.props.actions.collections.oneReorder(this.props.item._id, {to: obj.parentId})
		
		if (typeof obj.title == 'undefined')
			this.props.actions.collections.draftCommit(this.props.item._id)
	}
	
	onRemove = ()=>{
		this.props.navigation.navigate('remove', {
			...this.props.item,
			onDone: this.onClose
		})
	}
	
	render() {
		const { status, item, sharingCount } = this.props
		const loading = (status=='loading'||status=='saving')

		switch(status){
			case 'error':
				return <Error />

			default:
				return (
					<LoadingView loading={loading} pointerEvents={loading ? 'none' : 'auto'}>
						<ScrollForm>
							<Form 
								{...item}
								sharingCount={sharingCount}
								focus={this.props.focus}
								navigation={this.props.navigation}
								isModal={this.props.isModal}
								onSave={this.onClose}
								onChange={this.onChange} />

							<Settings 
								navigation={this.props.navigation}
								isModal={this.props.isModal}
								_id={item._id}
								showSelectMode={true} />

							<Text>
								{t.s('addSuccess') + ' ' + relativeDate(item.created)}
							</Text>

							<ButtonLink danger onPress={this.onRemove}>{t.s('removeCollectionForever')}</ButtonLink>
						</ScrollForm>
					</LoadingView>
				)
		}
	}
}

const makeMapStateToProps = () => {
	const 
		getDraftItem = makeDraftItem(),
		getDraftStatus = makeDraftStatus()

	const mapStateToProps = (state, { route: { params={} } })=>{
		const item = getDraftItem(state, params._id)

		return {
			status: getDraftStatus(state, params._id),
			item: item,
			sharingCount: getSharingCount(state, params._id)
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
)(EditCollectionForm)