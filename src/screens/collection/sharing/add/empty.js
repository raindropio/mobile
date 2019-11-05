import t from 't'
import React from 'react'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
    EmptyImage
} from 'co/style/empty'

export default class CollectionSharingEmpty extends React.Component {
    state = {
        image: false
    }

    async componentDidMount() {
        this.setState({image: await require('assets/images/emptyCollections.png')})
    }

    render() {
        return (
            <EmptyView>
                {this.state.image && <EmptyImage source={this.state.image} />}
                <EmptyTitle>{t.s('shareCollaborate')}</EmptyTitle>
                <EmptySubTitle>{t.s('collaboratorsLead')}</EmptySubTitle>
            </EmptyView>
        )
    }
}