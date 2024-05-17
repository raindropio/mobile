import { useMemo, useCallback } from 'react';
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { set } from 'data/actions/config'

import Segmented from 'co/segmented'

export default function SearchHeaderTabs({ route: { params: { spaceId } } }) {
    const dispatch = useDispatch()

    const incollection = useSelector(state=>state.config.raindrops_search_incollection)
    const getCollection = useMemo(()=>makeCollection(), [])
    const { title } = useSelector(state=>getCollection(state, spaceId))

    const tabs = useMemo(()=>[ t.s('everywhere'), title ], [title])

    const onChange = useCallback(selectedSegmentIndex=>{
        dispatch(set('raindrops_search_incollection', selectedSegmentIndex ? true : false))
    }, [])

    if (!spaceId)
        return null

    return (
        <Segmented
            selectedIndex={incollection ? 1 : 0}
            values={tabs}
            onChange={onChange} />
    )
}