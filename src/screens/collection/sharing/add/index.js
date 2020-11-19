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
        const { route: { params={} }, ...etc } = this.props
        return <View {...params} {...etc} />
    }
}

export default connect(
    (state, { route: { params={} } })=>({
        status: getSharingSendInvitesStatus(state, params._id),
        sendTo: getSharingSendInvitesTo(state, params._id)
    }),
	{
        sharingSendInvites
    }
)(CollectionSharingAddScreen)