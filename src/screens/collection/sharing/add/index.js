import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sharingSendInvites } from 'data/actions/collections'
import { getSharingSendInvitesStatus, getSharingSendInvitesTo } from 'data/selectors/collections'
import View from './view'

class CollectionSharingAddScreen extends React.Component {
    static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number
            })
        })
    }

    static options = {
        title: t.s('inviteMorePeople'),
        headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
    }

    render() {
        return <View {...this.props} />
    }
}

export default connect(
    (state, { _id })=>({
        status: getSharingSendInvitesStatus(state, _id),
        sendTo: getSharingSendInvitesTo(state, _id)
    }),
	{
        sharingSendInvites
    }
)(CollectionSharingAddScreen)