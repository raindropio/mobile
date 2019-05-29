import React from 'react'
import { Share } from 'react-native'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import t from 't'
import _ from 'lodash'

import { connect } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'
import { isPro } from 'data/selectors/user'

import { Form, Input } from 'co/style/form'
import Warning from 'co/common/alert/warning'
import { ShareButton, ShareIcon } from './style'
import MainIcon from './icon'
import CollectionIcon from 'co/common/icon'
import Goto from 'co/common/goto'
import Toggle from 'co/common/toggle'

class CollectionForm extends React.PureComponent {
	static propTypes = {
		_id: 		PropTypes.number,
		title: 		PropTypes.string,
		cover:		PropTypes.string,
		cover_path:	PropTypes.string,
		color:		PropTypes.string,
		public:		PropTypes.bool,
		parentId:	PropTypes.any,

		focus:		PropTypes.string,

		onChange: 	PropTypes.func,
		onSave:		PropTypes.func
	}

	static defaultProps = {
		focus:		'title'
	}

	onMoveTap = ()=>{
		Navigation.push(this.props, 'collections/picker', {
			title: `${t.s('group')} ${t.s('or')} ${t.s('collection').toLowerCase()}`,
			selectedId: this.props.path.length && this.props.path[this.props.path.length-1]._id,
			hideIds: [this.props._id, -1, -99],
			groupSelectable: true,
			onSelect: (parentId)=>{
				this.props.onChange({parentId})
			}
		})
	}

	onIconTap = ()=>{
		Navigation.push(this.props, 'collection/icon', {
			cover_path: this.props.cover_path,
			onChange: this.props.onChange
		})
	}

	onPublicTap = ()=>
		this.props.onChange({public: !this.props.public})

	onShareTap = ()=>
		Share.share({
			url: 'https://raindrop.io/collection/'+this.props._id,
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
			cover,
			color,
			path,
			children,
			parentId,
			onSave
		} = this.props

		let pathText = '', pathIcon

		if (path.length){
			pathText = path.map((p)=>p.title).join(' / ')

			if (Number.isInteger(parentId)){
				const lastPathItem = path[path.length-1]
				pathIcon = <CollectionIcon collectionId={lastPathItem._id} src={lastPathItem.cover} title={lastPathItem.title} color={lastPathItem.color} size='list' />
			}
		}

		return (
			<React.Fragment>
				<MainIcon {...this.props} onPress={this.onIconTap} />

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
					<Toggle last
						label={t.s('sharing')+' '+t.s('accessViaLink').toLowerCase()}
						value={this.props.public}
						onChange={this.onPublicTap}>
						{(this.props.public && _id) ? <ShareButton onPress={this.onShareTap}><ShareIcon /></ShareButton>:null}
					</Toggle>
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