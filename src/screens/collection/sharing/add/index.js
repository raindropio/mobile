import t from 't'
import { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sharingSendInvites } from 'data/actions/collections'

import PreventClose from 'co/navigation/preventClose'
import View from './view'

class CollectionSharingAddScreen extends Component {
    static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                _id:    PropTypes.number
            })
        })
    }

    static options = {
        title: t.s('invite')
    }

    render() {
        const { route: { params={} }, ...etc } = this.props
        return (
            <>
                <PreventClose
                    back={false} />

                <View {...params} {...etc} />
            </>
        )
    }
}

export default connect(
    (state, { route: { params={} } })=>({
    }),
	{
        sharingSendInvites
    }
)(CollectionSharingAddScreen)