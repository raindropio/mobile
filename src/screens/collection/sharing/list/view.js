import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import LoadingView from 'co/common/loadingView'
import SimpleSectionList from 'co/list/sections/simple'
import Avatar from 'co/common/avatar'
import Empty from './empty'

export default class CollectionSharingView extends React.Component {
    static propTypes = {
        _id:    PropTypes.number,
        status: PropTypes.string,
        users:  PropTypes.object,
	}

	componentDidMount() {
		this.props.load(this.props._id)
		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'add':
				this.onInvite()
			break
		}
	}
	
	getItemAttribute = (user, key)=>{
		switch(key){
			case 'title': return user.fullName
			case 'description': return user.me ? t.s('me') : user.email
			case 'iconComponent': return <Avatar {...user} />
		}
		return null
	}

    sections = [{
		id: 'owner',
		title: t.s('role_owner'),
		getItemAttribute: this.getItemAttribute
	}, {
		id: 'member',
		title: t.s('role_members'),
		getItemAttribute: this.getItemAttribute
	}, {
		id: 'viewer',
		title: t.s('role_viewer'),
		getItemAttribute: this.getItemAttribute
	}, {
		id: 'actions',
		title: t.s('sharing'),
		getItemAttribute: (item, key)=>item[key]
	}]

	actions = [{
		_id: 'unshare',
		title: t.s('unshareCollection'),
		action:'',
		icon: require('assets/images/trash.png')
	}]

	onItemPress = (item, {id})=>{
		switch (id) {
			case 'actions':
				switch (item._id) {
					case 'unshare':
						this.props.unshare(this.props._id)
						Navigation.close(this.props)
					break
				}
			break
		
			case 'member':
			case 'viewer':
				Navigation.push(this.props, 'misc/picker', {
					options: [
						{id:'member', label: t.s('role_member')},
						{id:'viewer', label: t.s('role_viewer')},
						{id:'remove', label: t.s('removeIt')}
					],
					selected: id,
					title: item.fullName,
					subtitle: item.email,
					onSelect: (role)=>{
						this.props.updateUser(this.props._id, item._id, { role })
					}
				})
			break
		}
	}

	onInvite = ()=>{
		Navigation.push(this.props, 'collection/sharing/add', {
			_id: this.props._id
		})
	}
	
	renderEmpty = ()=>
		<Empty {...this.props} />

    render() {
        return (
            <LoadingView loading={this.props.status=='loading'}>
                <SimpleSectionList 
					sections={this.sections}
					actions={this.props.count && this.actions}
					ListEmptyComponent={this.renderEmpty()}
					onItemPress={this.onItemPress}
                    {...this.props.users} />
            </LoadingView>
        )
    }
}