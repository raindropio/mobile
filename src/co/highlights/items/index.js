import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { highlights as getHighlights } from 'data/selectors/bookmarks'
import { isPro } from 'data/selectors/user'
import { oneLoad } from 'data/actions/bookmarks'

import Shadow from 'co/list/helpers/shadow'
import { List } from './style'
import Item from '../item'
import Empty from './empty'
import Add from './add'

export default function HighlightsItems({ _id }) {
    const dispatch = useDispatch()
    const highlights = useSelector(state=>getHighlights(state, _id))
    const pro = useSelector(state=>isPro(state))

    //load highlights
    useEffect(()=>{dispatch(oneLoad(_id))}, [_id])

    //list specific
    const keyExtractor = useCallback(({_id})=>_id, [])

    const renderItem = useCallback(({ item })=>(
        <Item
            {...item}
            bookmarkId={_id}
            pro={pro} />
    ), [_id, pro])

    const onRefresh = useCallback(()=>dispatch(oneLoad(_id)), [_id])

    return (
        <Shadow>{onScroll=>
            <List
                data={highlights}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListEmptyComponent={<Empty _id={_id} />}
                ListHeaderComponent={highlights.length ? <Add _id={_id} /> : null}
                onRefresh={onRefresh}
                onScroll={onScroll} />
        }</Shadow>
    )
}