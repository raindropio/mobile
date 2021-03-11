import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDraftItem, getDraftStatus, getDraftError } from 'data/selectors/bookmarks'
import { draftLoad } from 'data/actions/bookmarks'

const emptyArray = []

export default function useSave(values, options) {
    const val = (values.length == 1 ? values[0] : emptyArray)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(
            draftLoad(
                val.link,
                {
                    ...options,
                    item: val
                }
            )
        )
    }, [val])

    const status = useSelector(state=>getDraftStatus(state, val.link))
    const item = useSelector(state=>getDraftItem(state, val.link))
    const items = useMemo(()=>[item], [item])
    const error = useSelector(state=>getDraftError(state, val.link))
    
    return [status, items, error]
}