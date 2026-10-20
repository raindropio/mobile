import t from 't'
import { useSelector } from 'react-redux'
import { getSharingStatus } from 'data/selectors/collections'

import {
	EmptyView,
    EmptyTitle,
    EmptyImage,
    EmptySubTitle
} from 'co/style/empty'

export default function SharingEmpty({ _id }) {
    const status = useSelector(state=>getSharingStatus(state, _id))

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