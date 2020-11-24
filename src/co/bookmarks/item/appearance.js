import React from 'react'
import { connect } from 'react-redux'
import { makeDraftItem } from 'data/selectors/bookmarks'
import Appearance from 'co/collections/item/appearance'

export default connect(
    ()=>{
        const getDraft = makeDraftItem()

        return (state, { _id }) => ({
            _id: getDraft(state, _id).collectionId
        })
    }
)(Appearance)