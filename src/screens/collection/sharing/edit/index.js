import React from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sharingLoad, sharingUpdateUser } from 'data/actions/collections'
import { makeCollection, makeSharingByRole } from 'data/selectors/collections'

import Header from 'co/navigation/header'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'

class SharingEdit extends React.Component {
    static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number,
                userId: PropTypes.number
            })
        })
    }

    state = {
        user: {},
        user_role: ''
    }

    static getDerivedStateFromProps({ route: { params: { userId } }, users=[] }) {
        let user
        let user_role = ''

        for(const role in users){
            user = users[role].find(({_id}) => _id == userId)
            if (user){
                user_role = role
                break
            }
        }

        return {
            user: user||{},
            user_role
        }
    }

    roles = [
		{id:'member', label: t.s('role_member')+' '+t.s('und')+' '+t.s('inviteMorePeople').toLowerCase()},
		{id:'viewer', label: t.s('role_viewer')},
		{id:'remove', label: t.s('remove')}
    ]

	onSelect = (role)=>{
		this.props.sharingUpdateUser(
            this.props.route.params._id, 
            this.props.route.params.userId, 
            { role }
        )

		this.props.navigation.goBack()
	}

	render() {
        const { collection: { access } } = this.props
        const { user: { name }, user_role } = this.state

		return (
			<ScrollForm>
                <Header.Title name={name}>
                    {name}
                </Header.Title>

				<Form>
                    <PickFlatList 
                        selected={user_role}
                        options={access.level >= 3 ? this.roles : this.roles.slice(1)}
                        onSelect={this.onSelect} />
				</Form>
			</ScrollForm>
		)
	}
}

export default connect(
    () => {
        const getCollection = makeCollection()
        const getSharingByRole = makeSharingByRole()
    
        return (state, { route: { params={} } })=>({
            collection: getCollection(state, params._id),
            users: getSharingByRole(state, params._id)
        })
    },
	{ sharingLoad, sharingUpdateUser }
)(SharingEdit)