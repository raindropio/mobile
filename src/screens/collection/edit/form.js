import { Component } from 'react';
import { ThemeContext } from 'styled-components/native'
import PropTypes from 'prop-types'
import t from 't'
import _ from 'lodash-es'
import { links } from 'config'

import { connect } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'
import { user } from 'data/selectors/user'

import { ScrollForm, Form, Input } from 'co/form'
import Icon from 'co/collections/item/icon'
import Goto from 'co/goto'
import Toggle from 'co/form/toggle'
import Remove from './remove'

class CollectionForm extends Component {
	static contextType = ThemeContext

	static propTypes = {
		_id: 		PropTypes.number,
		title: 		PropTypes.string,
		cover:		PropTypes.array,
		color:		PropTypes.string,
		public:		PropTypes.bool,
		parentId:	PropTypes.any,

		focus:		PropTypes.string,

		onChange: 	PropTypes.func,
		onSave:		PropTypes.func
	}

	static defaultProps = {
		focus:		''
	}

	onMoveTap = ()=>{
		const parent = _.last(this.props.path)||{}

		this.props.navigation.navigate('collection/path', {
			_id: this.props._id, 
			parentId: parent._id,
			onSelect: (parentId)=>{
				this.props.onChange({parentId})
			}
		})
	}

	onCoverTap = ()=>{
		this.props.navigation.navigate('collection/cover', {
			color: this.props.color,
			onChange: this.props.onChange
		})
	}

	onPublicTap = ()=>
		this.props.onChange({public: !this.props.public})

	onShareTap = ()=>{
		const { _id, slug, user } = this.props
		const url = `${links.site.index}/${user.name}/${slug}-${_id}`

		require('react-native-share').default.open({
			title: this.props.title,
			url,
			failOnCancel: false
		})
	}

	onChangeTitle = (text)=>
		this.props.onChange({title: text})
	
	render() {
		const {
			_id,
			title,
			path,
			cover=[],
			children,
			access={},
			onSave
		} = this.props

		let pathText = ''

		if (path.length)
			pathText = path.map((p)=>p.title).join(' / ')

		return (
			<ScrollForm>				
				{/*Title and description*/}
				<Form>
					<Input 
						heading
						autoFocus={this.props.focus=='title'}
						value={title}
						placeholder={t.s('name')}
						returnKeyType='done'
						onChangeText={this.onChangeTitle}
						onSubmitEditing={onSave} />

					<Goto
						last
						icon={<Icon collectionId={_id} src={cover[0]} size={24} color='accent' />}
						label={t.s('icon')}
						onPress={this.onCoverTap} />
				</Form>
				
				<Form>
					<Goto
						onPress={this.onMoveTap}
						icon='menu'
						label={t.s('location')}
						subLabel={pathText} />

					<Toggle
						last={!this.props.public}
						icon={this.props.public ? 'lock-unlock' : 'lock'}
						label={t.s('private')}
						value={!this.props.public}
						onChange={this.onPublicTap} />

					{this.props.public && _id && (
						<Goto
							last
							onPress={this.onShareTap}
							icon='global'
							label={t.s('share')}
							subLabel={t.s('access')+' '+t.s('accessViaLink').toLowerCase()} />
					)}
				</Form>

				{children}

				{access.level >= 3 && (
					<Form>
						<Remove {...this.props} last />
					</Form>
				)}
			</ScrollForm>
		)
	}
}

export default connect(
	() => {
		const getCollectionPath = makeCollectionPath()
	
		return (state, { _id, parentId })=>({
			user: user(state),
			path: getCollectionPath(state, _id||parentId, {group:true, self: !_id})
		})
	}
)(CollectionForm)