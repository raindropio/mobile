import { PureComponent } from 'react';
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { oneCreate } from 'data/actions/collections'

import Header from 'co/navigation/header'
import Button, { Buttons } from 'co/button'
import Form from '../edit/form'

class AddCollectionForm extends PureComponent {
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

	static options = {
		headerStyle: {
			backgroundColor: 'transparent',
			elevation: 0,
			shadowOpacity: 0
		}
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

		this.props.oneCreate(
			this.state.newItem, 
			(item)=>{
				this.props.navigation.goBack()
				this.props.route.params.onSuccess && this.props.route.params.onSuccess(item)
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
		const { newItem: { title }, loading } = this.state
		const disabled = !(title||'').trim() || loading
		
		return (
			<>
				<Header.Buttons a>
					<Header.Cancel onPress={this.props.navigation.goBack} />
				</Header.Buttons>

				<Buttons vertical>
					<Button 
						title={t.s('create')}
						bold
						background='color.accent'
						disabled={disabled}
						onPress={this.onSave} />
				</Buttons>
			</>
		)
	}
	
	render() {
		return (
			<>
				<Header.Title parentId={this.state.newItem.parentId}>
					{typeof this.state.newItem.parentId == 'number' ? t.s('createSubFolder') : t.s('collectionNew')}
				</Header.Title>

				<Form 
					{...this.state.newItem}
					focus='title'
					navigation={this.props.navigation}
					onSave={this.onSave}
					onChange={this.onChange}>
					{this.renderButtons()}
				</Form>
			</>
		)
	}
}

const emptyObject = {}
export default connect(
	(state)=>({
		firstGroup: state.collections.groups.length ? state.collections.groups[0] : emptyObject
	}),
	{ oneCreate }
)(AddCollectionForm)