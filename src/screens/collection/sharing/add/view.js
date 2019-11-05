import _ from 'lodash'
import t from 't'
import React from 'react'
import { Alert } from 'react-native'
import { mediumFade } from 'co/style/animation'
import Field from 'co/common/tokenField'
import { ScrollForm, Form, FormSection } from 'co/style/form'
import { SectionText } from 'co/style/section'
import { ButtonAction } from 'co/common/button'
import PickFlatList from 'co/list/flat/pick'
import Empty from './empty'

export default class CollectionSharingAddView extends React.Component {
    state = {
        email: '',
		emails: [],
		role: 'member'
    }

    fieldEvents = {
        onAdd: async(email)=>{
			if (email)
				await new Promise((res) => this.setState({
					emails: _.uniq([...this.state.emails, email]),
					email: ''
				}, res) )
		},

		onRemove: (removeIndex)=>
			this.setState({emails: this.state.emails.filter((_,i)=>i!=removeIndex)}),

		onClear: ()=> this.setState({emails: []}),
		onValueChange: (email)=> this.setState({ email })
	}

	roles = [
		{ id: 'member', label: t.s('role_members')+' '+t.s('und')+' '+t.s('inviteMorePeople').toLowerCase() },
		{ id: 'viewer', label: t.s('role_viewer') }
	]

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status != this.props.status)
			switch(this.props.status) {
				case 'error':
					Alert.alert(t.s('sendInvites')+' '+t.s('server').toLowerCase())
				break

				case 'done':
					this.setState({ emails: [] })
					Alert.alert(t.s('invitesSendTo')+' '+this.props.sendTo.join(', '))
				break
			}

		if ((prevState.emails != this.state.emails) || (!prevState.email != !this.state.email))
			mediumFade()
	}
	
	onChangeRole = (role)=>this.setState({role})

	onSend = async()=>{
		if (this.state.email)
			await this.fieldEvents.onAdd(this.state.email)
			
		this.props.sharingSendInvites(this.props._id, this.state.emails, this.state.role)
	}

	renderActions = ()=>(
		<React.Fragment>
			<FormSection><SectionText>{t.s('withAccessLevel')}</SectionText></FormSection>
			<Form>
				<PickFlatList 
					options={this.roles}
					selected={this.state.role}
					onSelect={this.onChangeRole} />
			</Form>

			<ButtonAction disabled={this.props.status=='loading'} onPress={this.onSend}>
				{this.props.status=='loading' ? t.s('loading')+'...' : t.s('sendInvites')}
			</ButtonAction>
		</React.Fragment>
	)

    render() {
		const empty = !this.state.emails.length && !this.state.email

        return (
			<ScrollForm>
				<Form first>
					<Field 
						value={this.state.email}
						selected={this.state.emails}
						placeholder={t.s('enterEmails')}
						keyboardType='email-address'
						autoCompleteType='email'
						textContentType='emailAddress'
						events={this.fieldEvents} />
				</Form>

				{empty ? <Empty /> : this.renderActions()}
			</ScrollForm>
        )
    }
}