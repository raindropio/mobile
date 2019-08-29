import React from 'react'
import t from 't'
import { Alert } from 'react-native'
import Navigation from 'modules/navigation'
import { relative as relativeDate } from 'modules/format/date'
import color from 'co/collections/utils/color'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/collections'

import doneButton from 'co/screen/buttons/done'
import { ScrollForm } from 'co/style/form'
import Form from './form'
import Settings from './settings'
import Error from 'co/common/alert/error'
import LoadingView from 'co/common/loadingView'
import { ButtonLink } from 'co/common/button'

class EditCollectionForm extends React.PureComponent {
	static defaultProps = {
		_id:			undefined,
		viewMode: 		false //run from viewing
	}

	static options({_id}) {
		return {
			style: 'form',
			tintColor: color(_id),

			topBar: {
				title: {
					text: t.s('collection')
				},
				...doneButton
			}
		}
	}

	onClose = ()=>{
		Navigation.close(this.props)
	}

	constructor(props) {
		super(props)
		
		props.actions.collections.draftLoad(props._id)
		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		this.props.actions.collections.draftCommit(this.props.item._id)
		this._navigationEvents && this._navigationEvents.remove()
	}

	componentDidUpdate(prevProps) {
		const { status, item } = this.props

		if (status != prevProps.status) {
			if (status == 'errorSaving')
				return Alert.alert(t.s('saveError'))
		}
		
		if (item != prevProps.item) {
			Navigation.mergeOptions(this.props, {
				topBar: {
					subtitle: {
						text: t.s('addSuccess') + ' ' + relativeDate(item.created)
					}
				}
			})
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
		Navigation.push(this.props, 'collection/remove', {
			...this.props.item,
			onDone: this.onClose
		})
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
						<ScrollForm>
							<Form 
								{...item}
								focus={this.props.viewMode ? '' : 'title'}
								componentId={this.props.componentId}
								isModal={this.props.isModal}
								onSave={this.onClose}
								onChange={this.onChange} />

							<Settings 
								componentId={this.props.componentId}
								isModal={this.props.isModal}
								_id={item._id}
								showSelectMode={this.props.viewMode} />

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
)(EditCollectionForm)