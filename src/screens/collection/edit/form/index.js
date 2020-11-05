import React from 'react'
import { Share, Platform, Alert } from 'react-native'
import PropTypes from 'prop-types'
import {isExtension} from 'modules/native'
import t from 't'
import _ from 'lodash-es'

import { connect } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'
import { isPro } from 'data/selectors/user'

import { Form, Input } from 'co/style/form'
import Warning from 'co/common/alert/warning'
import MainIcon from './icon'
import CollectionIcon from 'co/common/icon'
import Goto from 'co/common/goto'
import Toggle from 'co/common/toggle'

class CollectionForm extends React.PureComponent {
	static propTypes = {
		_id: 		PropTypes.number,
		title: 		PropTypes.string,
		cover:		PropTypes.array,
		color:		PropTypes.string,
		public:		PropTypes.bool,
		parentId:	PropTypes.any,
		sharingCount:PropTypes.number,

		focus:		PropTypes.string,

		onChange: 	PropTypes.func,
		onSave:		PropTypes.func
	}

	static defaultProps = {
		focus:		''
	}

	state = {
		iOSExtension: false
	}

	async componentDidMount() {
		this.setState({
			iOSExtension: await isExtension() && Platform.OS=='ios'
		})
	}

	onMoveTap = ()=>{
		this.props.navigation.navigate('path', {
			_id: this.props._id, 
			parentId: this.props.path[this.props.path.length-1]._id,
			onSelect: (parentId)=>{
				if (!this.props.isPro && Number.isInteger(parentId))
					return Alert.alert(t.s('nestedCollections') + ': ' + t.s('onlyInPro'))

				this.props.onChange({parentId})
			}
		})
	}

	onCoverTap = ()=>{
		this.props.navigation.navigate('cover', {
			color: this.props.color,
			onChange: this.props.onChange
		})
	}

	onPublicTap = ()=>
		this.props.onChange({public: !this.props.public})

	onShareTap = ()=>
		Share.share({
			url: 'https://raindrop.io/collection/'+this.props._id,
		})

	onSharingTap = ()=>
		this.props.navigation.navigate(this.props.sharingCount ? 'sharing/list' : 'sharing/add', {
			_id: this.props._id
		})

	onChangeTitle = (text)=>
		this.props.onChange({title: text})

	renderOnlyPro = ()=>{
		if (!this.props.isPro && Number.isInteger(this.props.parentId))
			return (
				<Warning message={t.s('nestedCollections') + ': ' + t.s('onlyInPro')} />
			)
	}
	
	render() {
		const {
			_id,
			title,
			path,
			children,
			parentId,
			sharingCount,
			onSave
		} = this.props

		let pathText = '', pathIcon

		if (path.length){
			pathText = path.map((p)=>p.title).join(' / ')

			if (Number.isInteger(parentId)){
				const lastPathItem = path[path.length-1]
				pathIcon = <CollectionIcon collectionId={lastPathItem._id} src={Array.isArray(lastPathItem.cover) && lastPathItem.cover[0]} size='list' />
			}
		}

		return (
			<React.Fragment>
				<MainIcon {...this.props} onPress={this.onCoverTap} />

				{this.renderOnlyPro()}
				
				{/*Title and description*/}
				<Form first>
					<Input 
						heading
						autoFocus={this.props.focus=='title'}
						value={title}
						placeholder={t.s('enterTitle')}
						returnKeyType='done'
						onChangeText={this.onChangeTitle}
						onSubmitEditing={onSave} />

					<Goto last
						onPress={this.onMoveTap}
						iconComponent={pathIcon}
						label={Number.isInteger(parentId) ? t.s('location') : t.s('group')}
						subLabel={pathText} />
				</Form>
				
				<Form>
					<Toggle
						last={!_id}
						icon={this.props.public ? require('assets/images/unlock.png') : require('assets/images/lock.png')}
						label={t.s('private')}
						value={!this.props.public}
						onChange={this.onPublicTap} />

					{this.props.public && _id && (
						<Goto
							onPress={this.onShareTap}
							icon={require('assets/images/public.png')}
							label={t.s('access')+' '+t.s('accessViaLink').toLowerCase()}
							subLabel={t.s('share')}
							/>
					)}

					{_id && !this.state.iOSExtension ? (
						<Goto last
							onPress={this.onSharingTap}
							icon={require('assets/images/collaborators.png')}
							label={t.s('members')}
							subLabel={sharingCount} />
					) : null}
				</Form>

				{children}
			</React.Fragment>
		)
	}
}

export default connect(
	() => {
		const getCollectionPath = makeCollectionPath()
	
		return (state, { _id, parentId })=>({
			isPro: isPro(state),
			path: getCollectionPath(state, _id||parentId, {group:true, self: !_id})
		})
	},
	()=>({})
)(CollectionForm)