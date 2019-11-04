import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import color from 'co/collections/utils/color'
import { connect } from 'react-redux'
import { sharingSendInvites } from 'data/actions/collections'
import { getSharingSendInvitesStatus, getSharingSendInvitesTo } from 'data/selectors/collections'
import View from './view'

class CollectionSharingAddScreen extends React.Component {
    static propTypes = {
        _id:    PropTypes.number
    }

    static options({_id}) {
        return {
            style: 'form',
            tintColor: color(_id),
            
            topBar: {
                title: {
                    text: t.s('inviteMorePeople')
                }
            },

            animations: {
				push: {
                    waitForRender: true,
				}
			}
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