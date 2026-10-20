import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { highlights as getHighlights } from 'data/selectors/bookmarks'
import { isPro } from 'data/selectors/user'
import { oneLoad } from 'data/actions/bookmarks'

import { Wrap, List } from './style'
import Item from '../item'
import Empty from './empty'
import Add from './add'

const keyExtractor = ({_id})=>_id

export default function HighlightsItems({ _id }) {
    const dispatch = useDispatch()
    const highlights = useSelector(state=>getHighlights(state, _id))
    const pro = useSelector(state=>isPro(state))

    //load highlights
    useEffect(()=>{dispatch(oneLoad(_id))}, [dispatch, _id])

    //list specific
    const renderItem = ({ item })=>(
        <Item
            {...item}
            bookmarkId={_id}
            pro={pro} />
    )

    const onRefresh = ()=>dispatch(oneLoad(_id))

    return (
        <Wrap>
            <List
                data={highlights}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListEmptyComponent={<Empty _id={_id} />}
                ListHeaderComponent={highlights.length ? <Add _id={_id} /> : null}
                onRefresh={onRefresh}/>
        </Wrap>
    )
}