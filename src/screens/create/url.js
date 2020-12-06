import React from 'react'
import { connect } from 'react-redux'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'
import { draftLoad } from 'data/actions/bookmarks'

class CreateURL extends React.Component {
    componentDidMount() {
        const { values, collectionId, preventDuplicate, draftLoad } = this.props

        draftLoad(values[0].link, {
            item: {
                ...values[0],
                collectionId
            },
            autoCreate: true,
            preventDuplicate
        })
    }

    render() {
        const { children, item, status } = this.props
        
        return children([item], status)
    }
}

export default connect(
    ()=>{
        const getItem = makeDraftItem()
        const getStatus = makeDraftStatus()

        return (state, { values=[] })=>({
            item: getItem(state, values[0].link),
            status: getStatus(state, values[0].link),
        })
    },
    { draftLoad }
)(CreateURL)