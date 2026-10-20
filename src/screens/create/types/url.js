import { useEffect, useEffectEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDraftItem, getDraftStatus, getDraftError } from 'data/selectors/bookmarks'
import { draftLoad } from 'data/actions/bookmarks'

const emptyObject = {}

export default function useSave(values, options) {
    const val = (values.length >= 1 ? values[0] : emptyObject)
    const dispatch = useDispatch()

    const load = useEffectEvent(()=>{
        dispatch(
            draftLoad(
                val.link,
                {
                    ...options,
                    item: val
                }
            )
        )
    })

    useEffect(()=>{
        load()
    }, [val?.link])

    const status = useSelector(state=>getDraftStatus(state, val.link))
    const item = useSelector(state=>getDraftItem(state, val.link))
    const items = [item]
    const error = useSelector(state=>getDraftError(state, val.link))

    return [status, items, error]
}