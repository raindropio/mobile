import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import t from 't'
import {Alert} from 'react-native'
import loadingButton from 'co/screen/buttons/loading'
import doneButton from 'co/screen/buttons/done'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'

import color from 'co/bookmarks/utils/color'
import Form from './form'
import Error from 'co/common/alert/error'
import LoadingView from 'co/common/loadingView'
import RemovedBookmark from './removed'

class EditBookmarkContainer extends React.Component {
	static propTypes = {
		_id: 			PropTypes.number,
		onClose:		PropTypes.func,
	}

	static options({_id}) {
		return {
			style: 'form',
			tintColor: color(_id),
		}
	}

	constructor(props) {
		super(props)

		props.actions.bookmarks.draftLoad(props._id)
		
		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	closeScreen = async()=>{
		await this.onSubmit()

		if (this.props.onClose)
			return this.props.onClose()
			
		Navigation.close(this.props)
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'done':
			case 'canel':
				this.closeScreen()
			break;
		}
	}

	componentWillUnmount() {
		this.onSubmit()
	}

	componentDidUpdate(prevProps) {
		const { status, item } = this.props

		if (status != prevProps.status || item.type != prevProps.item.type) {
			if (status == 'errorSaving')
				return Alert.alert(t.s('saveError'))

			Navigation.mergeOptions(this.props, {
				topBar: {
					title: {
						text: (t.s('editMin') + ' ' + t.s(item.type+'d'))
					},
					...(
						(status=='loading'||status=='saving') ? 
						loadingButton :
						doneButton
					)
				}
			})
		}
	}

	onChange = (obj)=>{
		this.props.actions.bookmarks.draftChange(this.props.item._id, obj)
	}

	onSubmit = ()=>{
		return new Promise((res,rej)=>{
			this.props.actions.bookmarks.draftCommit(
				this.props.item._id,
				res,
				rej
			)
		})
	}

	onRemove = ()=>{
		this.props.actions.bookmarks.oneRemove(this.props.item._id)
		this.closeScreen()
	}

	onRecover = ()=>{
		this.props.actions.bookmarks.oneRecover(this.props.item._id)
	}

	render() {
		const {status, item } = this.props
		const loading = (status=='loading'||status=='saving')

		switch(status){
			case 'error':
				return <Error />

			case 'removed':
				return (
					<RemovedBookmark 
						type={item.type}
						onRecover={this.onRecover}/>
				)

			default:
				return (
					<LoadingView loading={loading} pointerEvents={loading ? 'none' : 'auto'}>
						<Form 
							{...this.props}

							onChange={this.onChange}
							onSubmit={this.onSubmit}
							onRemove={this.onRemove} />
					</LoadingView>
				)
		}
	}
}

const makeMapStateToProps = () => {
	const 
		getDraftItem = makeDraftItem(),
		getDraftStatus = makeDraftStatus()

	const mapStateToProps = (state, {_id})=>{
		const item = getDraftItem(state, {_id})
		
		return {
			status: getDraftStatus(state, {_id}),
			item
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(EditBookmarkContainer)