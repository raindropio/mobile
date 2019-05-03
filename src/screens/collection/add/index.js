import React from 'react'
import t from 't'
import Navigation from 'modules/navigation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'

import { ScrollForm } from 'co/style/form'
import Form from '../edit/form'

class AddCollectionForm extends React.PureComponent {
	static options() {
		return {
			style: 'form',
	
			topBar: {
				title: {
					text: t.s('collectionNew')
				},
				largeTitle: {
					visible: true
				}
			}
		}
	}

	constructor(props) {
		super(props)

		this.state = {
			loading: false,

			newItem: {
				title: props.title || '',
				cover_path: '',
				public: false,
				parentId: props.parentId || props.firstGroup._id,
				view: 'list'
			}
		}

		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentDidMount() {
		this.onUpdateForm()
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}
	
	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'add':
				this.onSave()
			break
		}
	}

	closeScreen = ()=>{
		Navigation.close(this.props)
	}

	onSave = ()=>{
		this.setState({loading: true})

		this.props.actions.collections.oneCreate(
			this.state.newItem, 
			(item)=>{
				this.closeScreen()
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
			}),
			this.onUpdateForm
		)
	}

	onUpdateForm = ()=>{
		Navigation.mergeOptions(this.props, {
			topBar: {
				rightButtons: this.state.newItem.title.trim() ? [
					{
						id: 'add',
						text: t.s('create')
					}
				] : []
			}
		})
	}
	
	render() {
		return (
			<ScrollForm>
				<Form 
					{...this.state.newItem}
					componentId={this.props.componentId}
					onSave={this.onSave}
					onChange={this.onChange} />
			</ScrollForm>
		)
	}
}

const emptyObject = {}
export default connect(
	(state)=>({
		firstGroup: state.collections.groups.length ? state.collections.groups[0] : emptyObject
	}),
	(dispatch)=>({
		actions: {
			collections: bindActionCreators(collectionsActions, dispatch)
		}
	})
)(AddCollectionForm)