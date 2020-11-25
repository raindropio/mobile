import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { oneCreate } from 'data/actions/collections'
import { isPro } from 'data/selectors/user'

import { Title, Buttons, Button, Cancel } from 'co/navigation/header'
import LoadingView from 'co/common/loadingView'
import { ScrollForm } from 'co/style/form'
import Form from '../edit/form'

class AddCollectionForm extends React.PureComponent {
	static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
				title:		PropTypes.string,
				parentId:	PropTypes.oneOfType([
					PropTypes.string, //group id
					PropTypes.number //collection id
				]),
				onSuccess:	PropTypes.func
            })
        })
	}

	state = {
		loading: false,

		newItem: {
			title: this.props.route.params.title || '',
			public: false,
			parentId: this.props.route.params.parentId || this.props.firstGroup._id,
			view: 'list'
		}
	}

	onSave = ()=>{
		this.setState({loading: true})

		if (!this.props.isPro && Number.isInteger(this.state.newItem.parentId))
			this.state.newItem.parentId = undefined

		this.props.oneCreate(
			this.state.newItem, 
			(item)=>{
				this.props.navigation.goBack()
				this.props.onSuccess && this.props.onSuccess(item)
			}, 
			()=>{
				this.setState({loading: false})
			}
		)
	}

	onChange = (changedFields = {})=>{
		this.setState(
			state => ({
				newItem: {
					...state.newItem,
					...changedFields
				}
			})
		)
	}

	renderButtons = ()=>{
		const { newItem: { title='' }, loading } = this.state
		const disabled = !title.trim() || loading
		
		return (
			<>
				<Buttons left>
					<Cancel onPress={this.props.navigation.goBack} />
				</Buttons>

				<Buttons disabled={disabled}>
					<Button 
						title={t.s('create')}
						bold
						disabled={disabled}
						onPress={this.onSave} />
				</Buttons>
			</>
		)
	}
	
	render() {
		return (
			<LoadingView 
				loading={this.state.loading} 
				pointerEvents={this.state.loading ? 'none' : 'auto'}>
				<Title parentId={this.state.newItem.parentId}>
					{typeof this.state.newItem.parentId == 'number' ? t.s('createSubFolder') : t.s('collectionNew')}
				</Title>
				
				{this.renderButtons()}

				<ScrollForm>
					<Form 
						{...this.state.newItem}
						focus='title'
						navigation={this.props.navigation}
						onSave={this.onSave}
						onChange={this.onChange} />
				</ScrollForm>
			</LoadingView>
		)
	}
}

const emptyObject = {}
export default connect(
	(state)=>({
		isPro: isPro(state),
		firstGroup: state.collections.groups.length ? state.collections.groups[0] : emptyObject
	}),
	{ oneCreate }
)(AddCollectionForm)