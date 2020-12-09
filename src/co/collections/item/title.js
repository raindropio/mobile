import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'

import { ItemTitle } from './style'

function CollectionItemTitle({ _id, title, _path }) {
    if (_path)
        return (
            <ItemTitle>
                {_path.map(({ title }) => title).join(' / ') + ' / ' + title}
            </ItemTitle>
        )
    
    return (
        <ItemTitle>
            {_id==-100?t.s('create')+' ':''}{title}
        </ItemTitle>
    )
}

export default connect(
	() => {
        const getCollectionPath = makeCollectionPath()
    
        return (state, { _id, parentId, level })=>({
            _path: (!level && parentId) ? getCollectionPath(state, _id) : undefined
        })
    }
)(CollectionItemTitle)