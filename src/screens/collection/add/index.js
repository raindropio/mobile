import React from 'react'
import t from 't'
import Navigation from 'modules/navigation'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import { isPro } from 'data/selectors/user'

import loadingButton from 'co/screen/buttons/loading'
import LoadingView from 'co/common/loadingView'
import { ScrollForm } from 'co/style/form'
import Form from '../edit/form'

class AddCollectionForm extends React.PureComponent {
	static options() {
		return {
			style: 'form',
	
			topBar: {
				title: {
					text: t.s('collectionNew')
				}
			},

			animations: {
				push: {
                    waitForRender: true,
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
				public: false,
				parentId: props.parentId || props.firstGroup._id,
				view: 'list'
			}
		}

		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentDidMount() {
		if (this.props.autoSave)
			this.onSave()
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	componentDidUpdate(prevProps, prevState) {
		const { newItem, loading } = this.state

		if (prevState.newItem != newItem || prevState.loading != loading)
			Navigation.mergeOptions(this.props, {
				topBar: loading ? loadingButton : {
					rightButtons: newItem.title.trim() ? [
						{ id: 'add', text: t.s('create') }
					] : []
				}
			})
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

		if (!this.props.isPro && Number.isInteger(this.state.newItem.parentId))
			this.state.newItem.parentId = undefined

		this.props.oneCreate(
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
			})
		)
	}
	
	render() {
		return (
			<LoadingView loading={this.state.loading} pointerEvents={this.state.loading ? 'none' : 'auto'}>
				<ScrollForm>
					<Form 
						{...this.state.newItem}
						componentId={this.props.componentId}
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
	collectionsActions
)(AddCollectionForm)