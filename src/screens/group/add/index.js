import t from 't'
import React from 'react'
import { connect } from 'react-redux'
import { groupCreate } from 'data/actions/collections'

import Header from 'co/navigation/header'
import { ScrollForm, Form, Input } from 'co/style/form'

class EditGroupScreen extends React.PureComponent {
	static options = {
		title: t.s('newString') + ' ' + t.s('group').toLowerCase()
	}

	state = {
		title: '',
		loading: false
	}

	onSave = ()=>{
		this.setState({ loading: true })

		this.props.groupCreate(
			this.state.title,
			()=>{
				this.setState({ loading: false })
				this.props.navigation.goBack()
			},
			()=>
				this.setState({ loading: false })
		)
	}

	onTitleChange = (title)=>
		this.setState({ title })

	renderButtons = ()=>{
		const { title='', loading } = this.state
		const disabled = !title.trim() || loading

		return (
			<>
				<Header.Buttons left>
					<Header.Cancel onPress={this.props.navigation.goBack} />
				</Header.Buttons>

				<Header.Buttons disabled={disabled}>
					<Header.Button 
						title={t.s('create')}
						disabled={disabled}
						bold
						onPress={this.onSave} />
				</Header.Buttons>
			</>
		)
	}

	render() {
		const { title } = this.state
		
		return (
			<ScrollForm>
				{this.renderButtons()}

				<Form>
					<Input 
						last
						autoFocus
						value={title}
						placeholder={t.s('enterTitle')}
						returnKeyType='done'
						onChangeText={this.onTitleChange}
						onSubmitEditing={this.onSave} />
				</Form>
			</ScrollForm>
		)
	}
}

export default connect(
	undefined,
	{ groupCreate }
)(EditGroupScreen)