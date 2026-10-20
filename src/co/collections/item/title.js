import { useMemo } from 'react'
import t from 't'
import { useSelector } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'

import { ItemTitle } from './style'

export default function CollectionItemTitle({ item: { _id, parentId, title }, level, selected }) {
    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const _path = useSelector(state=>(!level && parentId) ? getCollectionPath(state, _id) : undefined)

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