import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'

import { ItemTitle } from './style'

function CollectionItemTitle({ item: { _id, title }, _path, selected }) {
    if (_path)
        return (
            <ItemTitle ellipsizeMode='middle' selected={selected}>
                {_path.map(({ title }) => title).join(' / ') + ' / ' + title}
            </ItemTitle>
        )
    
    return (
        <ItemTitle selected={selected}>
            {_id==-100?t.s('create')+' ':''}{title}
        </ItemTitle>
    )
}

export default connect(
	() => {
        const getCollectionPath = makeCollectionPath()
    
        return (state, { item: { _id, parentId }, level })=>({
            _path: (!level && parentId) ? getCollectionPath(state, _id) : undefined
        })
    }
)(CollectionItemTitle)