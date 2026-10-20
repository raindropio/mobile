import { useEffect, useEffectEvent, useState } from 'react'
import _ from 'lodash-es'
import { useDispatch } from 'react-redux'
import { oneUpload } from 'data/actions/bookmarks'

async function upload(values, dispatch) {
    let items = []

    for (const chunk of _.chunk(values, 10))
        items.push(
            ...(await Promise.all(
                chunk.map(item=>
                    new Promise((res,rej)=>
                        dispatch(oneUpload(item, res, rej))
                    )
                )
            ))
        )

    return _.flatten(items)
}

export default function useSave(values, { autoCreate=true }) {
    const dispatch = useDispatch()

    //null while saving
    const [result, setResult] = useState(null)

    const save = useEffectEvent(()=>{
        const key = values.length
        upload(values, dispatch)
            .then(items=>setResult({ key, status: 'loaded', items }))
            .catch(error=>setResult({ key, status: 'error', error }))
    })

    useEffect(()=>{
        if (autoCreate === false) return
        save()
    }, [values.length, autoCreate])

    if (autoCreate === false)
        return ['new', [], null]

    const { status='saving', items=[], error=null } = result?.key === values.length ? result : {}
    return [status, items, error]
}