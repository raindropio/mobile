import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { draftLoad, draftChange, draftCommit, selectOne, oneRemove, oneRecover } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus, getDraftError, makeDraftUnsaved } from 'data/selectors/bookmarks'
import { openURL } from 'modules/browser'
import { Share } from 'react-native'
import t from 't'
import getCacheURL from 'data/modules/format/cache_url'
import Clipboard from '@react-native-community/clipboard'

import { Buttons, Button } from 'co/navigation/header'
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
		title: t.s('bookmark'),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}

	componentDidMount() {
		this.props.draftLoad(this.props.route.params._id)
		this._beforeUnload = this.props.navigation.addListener('beforeRemove', this.beforeUnload)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.unsaved != this.props.unsaved){
			const options = {
				gestureEnabled: !this.props.unsaved
			}

			this.props.navigation.setOptions(options)
			this.props.navigation.dangerouslyGetParent().setOptions(options)
		}
	}

	componentWillUnmount() {
		this._beforeUnload && this._beforeUnload()
	}

	beforeUnload = e=>{
		const preventDefault = this.props.unsaved

		if (preventDefault)
			e.preventDefault()

		this.onCommit()
			.then(()=>{
				if (this.props.onClose)
					return this.props.onClose()
			})
			.then(()=>{
				if (preventDefault)
					this.props.navigation.goBack()
			})
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

	onOpenCache = async()=>{
		const link = await getCacheURL(this.props.item._id)

		if (link)
			openURL({ link, fromBottom: true })
	}

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
						<Buttons>
							{status=='saving' ? (
								<Button 
									disabled
									title={t.s('save')+'…'} />
							) : (
								<Button 
									bold
									title={t.s('done')}
									onPress={this.props.navigation.goBack} />
							)}
						</Buttons>
						
						<Form 
							{...this.props}
							{...params}

							onChange={this.onChange}
							onCommit={this.onCommit}
							onSelect={this.onSelect}
							onOpenCache={this.onOpenCache}
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