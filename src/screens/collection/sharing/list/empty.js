import t from 't'
import React from 'react'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
    EmptyImage
} from 'co/style/empty'

export default class CollectionSharingEmpty extends React.Component {
    render() {
        switch(this.props.status) {
            case 'errorLoading': return (
                <EmptyView>
                    <EmptyTitle>{t.s('server')}</EmptyTitle>
                </EmptyView>
            )

            case 'loaded': return (
                <EmptyView>
                    <EmptyImage source={require('assets/images/emptyCollections.png')} />
                    <EmptyTitle>{t.s('shareCollaborate')}</EmptyTitle>
                    <EmptySubTitle>{t.s('collaboratorsLead')}</EmptySubTitle>
                </EmptyView>
            )

            default: return null
        }
    }
}