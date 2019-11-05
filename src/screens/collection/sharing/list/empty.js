import t from 't'
import React from 'react'
import {
	EmptyView,
	EmptyTitle
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
                    <EmptyTitle>0 {t.s('members')}</EmptyTitle>
                </EmptyView>
            )

            default: return null
        }
    }
}