import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import color from 'co/collections/utils/color'
import addButton from 'co/screen/buttons/add'
import { connect } from 'react-redux'
import { sharingLoad, sharingUpdateUser, sharingRemoveUser, sharingUnshare } from 'data/actions/collections'
import { makeSharingByRole, getSharingStatus, getSharingCount } from 'data/selectors/collections'
import View from './view'

class CollectionSharingListScreen extends React.Component {
    static propTypes = {
        _id:    PropTypes.number
    }

    static options({_id}) {
        return {
            tintColor: color(_id),
            
            topBar: {
                title: {
                    text: t.s('members')
                },

                ...addButton
            }
        }
    }

    render() {
        return <View {...this.props} />
    }
}

export default connect(
    () => {
        const getSharingByRole = makeSharingByRole()
    
        return (state, { _id })=>({
            users: getSharingByRole(state, _id),
            count: getSharingCount(state, _id),
            status: getSharingStatus(state, _id)
        })
    },
	{
        load: sharingLoad,
        updateUser: sharingUpdateUser,
        removeUser: sharingRemoveUser,
        unshare: sharingUnshare
    }
)(CollectionSharingListScreen)