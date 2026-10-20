import { useMemo, useEffect } from 'react'
import _ from 'lodash-es'
import { useSelector, useDispatch } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'
import { refresh } from 'data/actions/collections'

import Icon from 'co/collections/item/icon'
import Goto from 'co/goto'

const options = { self: true }

export default function CollectionPath({ _id=0, ...etc }) {
    const dispatch = useDispatch()
    const getCollectionPath = useMemo(()=>makeCollectionPath(), [])
    const path = useSelector(state=>getCollectionPath(state, _id, options))

    useEffect(()=>{
        dispatch(refresh())
    }, [dispatch])

    if (!path.length)
        return null

    const pathText = path.map((p)=>p.title).join(' / ')
    const { _id: lastId, cover=[] } = _.last(path)||{}

    return (
        <Goto
            {...etc}
            ellipsizeMode='middle'
            icon={<Icon collectionId={lastId} src={cover[0]} color='accent' />}
            label={pathText} />
    )
}