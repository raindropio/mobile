import React from 'react'
import t from 't'
import { Alert } from 'react-native'
import { ScrollForm, Form, FormSection, InputEmail } from 'co/form'
import { SectionText } from 'co/style/section'
import Button, { Buttons } from 'co/button'
import PickFlatList from 'co/list/flat/pick'

export default class CollectionSharingAddView extends React.Component {
    state = {
        email: '',
		role: 'member'
    }

	roles = [
		{ id: 'member', label: t.s('role_members')+' '+t.s('und')+' '+t.s('inviteMorePeople').toLowerCase() },
		{ id: 'viewer', label: t.s('role_viewer') }
	]

	componentDidUpdate(prevProps) {
		if (prevProps.status != this.props.status)
			switch(this.props.status) {
				case 'error':
					Alert.alert(t.s('sendInvites')+' '+t.s('server').toLowerCase())
				break

				case 'done':
					this.setState({ email: '' })
					Alert.alert(t.s('invitesSendTo')+' '+this.props.sendTo.join(', '))
				break
			}
	}
	
	onChangeRole = (role)=>this.setState({role})

	onChangeField = email=>
		this.setState({ email })

	onSend = async()=>
		this.props.sharingSendInvites(this.props._id, [this.state.email||''], this.state.role)

	renderActions = ()=>(
		<React.Fragment>
			<FormSection><SectionText>{t.s('withAccessLevel')}</SectionText></FormSection>
			<Form>
				<PickFlatList 
					options={this.roles}
					selected={this.state.role}
					onSelect={this.onChangeRole} />
			</Form>
			
			<Buttons vertical>
				<Button 
					background='color.accent'
					bold
					disabled={!this.state.email || this.props.status=='loading'} 
					onPress={this.onSend}
					title={this.props.status=='loading' ? t.s('loading')+'...' : t.s('sendInvites')} />
			</Buttons>
		</React.Fragment>
	)

    render() {
        return (
			<ScrollForm>
				<Form>
					<InputEmail 
						last
						value={this.state.email}
						autoFocus
						onChangeText={this.onChangeField}
						onSubmit={this.onSend} />
				</Form>

				{this.renderActions()}
			</ScrollForm>
        )
    }
}