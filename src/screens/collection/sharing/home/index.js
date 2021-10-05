import t from 't'
import React from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sharingLoad, sharingRemoveUser, sharingUnshare } from 'data/actions/collections'
import { makeDraftItem, makeSharingByRole, getSharingCount } from 'data/selectors/collections'

import { Wrap } from './style'
import SimpleSectionList from 'co/list/sections/simple'
import Avatar from 'co/user/avatar'
import Empty from './empty'
import { Fab } from 'co/button'

class CollectionSharingView extends React.Component {
    static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number
            })
        }),
        status: PropTypes.string,
        users:  PropTypes.object,
    }
    
    static options = {
		title: t.s('members'),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
    }

	componentDidMount() {
		this.props.load(this.props.route.params._id)
	}

	getItemAttribute = (user, key)=>{
		switch(key){
			case 'title': return user.name
			case 'description': return user.me ? t.s('me') : user.email
			case 'icon': return <Avatar {...user} />
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
		icon: 'delete-bin'
	}]

	onItemPress = (item, {id})=>{
		switch (id) {
			case 'actions':
				switch (item._id) {
					case 'unshare':
						Alert.alert(t.s('unshareCollection')+'?', '', [
							{text: t.s('cancel'), style: 'cancel'},
							{text: 'OK', onPress: () => {
								this.props.unshare(this.props.route.params._id)
								this.props.navigation.goBack()
							}}
						])
					break
				}
			break
		
			case 'member':
			case 'viewer':
				this.props.navigation.navigate('sharing/edit', {
					_id: this.props.route.params._id,
					userId: item._id
				})
			break
		}
	}

	onAddTap = ()=>
		this.props.navigation.navigate('sharing/add', this.props.route.params)
	
	renderEmpty = ()=>
		<Empty 
			_id={this.props.route.params._id} />

    render() {
        return (
            <Wrap>
                <SimpleSectionList 
					sections={this.sections}
					actions={this.props.count && this.props.collection.author && this.actions}
					ListEmptyComponent={this.renderEmpty()}
					onItemPress={this.onItemPress}
                    {...this.props.users} />

				<Fab onPress={this.onAddTap} />
            </Wrap>
        )
    }
}

export default connect(
    () => {
        const getDraftItem = makeDraftItem()
        const getSharingByRole = makeSharingByRole()
    
        return (state, { route: { params={} } })=>({
            collection: getDraftItem(state, params._id),
            users: getSharingByRole(state, params._id),
            count: getSharingCount(state, params._id),
        })
    },
	{
        load: sharingLoad,
        removeUser: sharingRemoveUser,
        unshare: sharingUnshare
    }
)(CollectionSharingView)