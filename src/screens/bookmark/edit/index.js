import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { draftLoad, draftChange, draftCommit, selectOne, oneRemove, oneRecover } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus, getDraftError, makeDraftUnsaved } from 'data/selectors/bookmarks'
import { Share } from 'react-native'
import t from 't'
import Clipboard from '@react-native-community/clipboard'

import Header from 'co/navigation/header'
import PreventClose from 'co/navigation/preventClose'
import { Error } from 'co/overlay'
import Form from './form'
import Crash from 'co/common/alert/error'
import RemovedBookmark from './removed'

class EditBookmarkContainer extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				_id: 			PropTypes.number,
				spaceId:		PropTypes.any,
				onClose:		PropTypes.func,
			})
		})
	}

	static options = {
		title: t.s('bookmark')
	}

	componentDidMount() {
		this.props.draftLoad(this.props.route.params._id)
	}

	async componentWillUnmount() {
		await this.onClose()
	}

	onClose = async()=>{
		await this.onCommit()

		if (this.props.onClose)
			this.props.onClose()

		return true
	}

	onChange = (obj)=>
		this.props.draftChange(this.props.item._id, obj)

	onCommit = ()=>{
		return new Promise((res,rej)=>{
			this.props.draftCommit(
				this.props.item._id,
				res,
				e=>{
					Error(e)
					rej(e)
				}
			)
		})
	}

	onSelect = ()=>{
		this.props.selectOne(this.props.route.params.spaceId, this.props.item._id)
		this.props.navigation.goBack()
	}

	onShare = ()=>
		Share.share({
			message: this.props.item.link,
			url: this.props.item.link,
		})

	onCopyLink = ()=>
		Clipboard.setString(this.props.item.link)

	onRemove = ()=>{
		this.props.oneRemove(this.props.item._id)
		this.props.navigation.goBack()
	}

	onRecover = ()=>
		this.props.oneRecover(this.props.item._id)

	render() {
		const { status, item, route:{ params={} }, error, unsaved } = this.props

		switch(status){
			case 'error':
				return <Crash message={error.error ? t.s('server'+error.error) : error.message} />

			case 'removed':
				return (
					<RemovedBookmark 
						type={item.type}
						onRecover={this.onRecover}
						onRemove={this.onRemove} />
				)

			default:
				return (
					<>
						{unsaved && <PreventClose onBeforeClose={this.onClose} />}

						<Header.Buttons>
							{status=='saving' ? (
								<Header.Button 
									disabled
									title={t.s('save')+'…'} />
							) : (
								<Header.Button 
									bold
									title={t.s('done')}
									onPress={this.props.navigation.goBack} />
							)}
						</Header.Buttons>
						
						<Form 
							{...this.props}
							{...params}

							onChange={this.onChange}
							onCommit={this.onCommit}
							onSelect={this.onSelect}
							onShare={this.onShare}
							onCopyLink={this.onCopyLink}
							onRemove={this.onRemove} />
					</>
				)
		}
	}
}

const makeMapStateToProps = () => {
	const 
		getDraftItem = makeDraftItem(),
		getDraftStatus = makeDraftStatus(),
		getDraftUnsaved = makeDraftUnsaved()

	const mapStateToProps = (state, { route: { params={} } })=>{
		const item = getDraftItem(state, params._id)
		
		return {
			status: getDraftStatus(state, params._id),
			item,
			error: getDraftError(state, params._id),
			unsaved: getDraftUnsaved(state, params._id)
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	{ draftLoad, draftChange, draftCommit, selectOne, oneRemove, oneRecover }
)(EditBookmarkContainer)