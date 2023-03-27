import t from 't'
import { connect } from 'react-redux'
import { getSharingStatus } from 'data/selectors/collections'

import {
	EmptyView,
    EmptyTitle,
    EmptyImage,
    EmptySubTitle
} from 'co/style/empty'

function SharingEmpty({ status }) {
    switch(status) {
        case 'errorLoading': return (
            <EmptyView>
                <EmptyTitle>{t.s('server')}</EmptyTitle>
            </EmptyView>
        )

        case 'loaded': return (
            <EmptyView>
                <EmptyImage source={require('./assets/empty.png')} />
                <EmptyTitle>{t.s('shareCollaborate')}</EmptyTitle>
                <EmptySubTitle>{t.s('collaboratorsLead')}</EmptySubTitle>
            </EmptyView>
        )

        default: return null
    }
}

export default connect(
    (state, { _id })=>({
        status: getSharingStatus(state, _id)
    })
)(SharingEmpty)