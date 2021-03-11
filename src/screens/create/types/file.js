import React, { useEffect, useState } from 'react'
import _ from 'lodash-es'
import { useDispatch } from 'react-redux'
import { oneUpload } from 'data/actions/bookmarks'

export default function useSave(values) {
    const dispatch = useDispatch()

    const [items, setItems] = useState([])
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState(null)

    useEffect(()=>{
        setStatus('saving')

        async function upload() {
            let items = []

            for (const chunk of _.chunk(values, 10))
                items.push(
                    ...await Promise.all(
                        chunk.map(item=>
                            new Promise((res,rej)=>
                                dispatch(oneUpload(item, res, rej))
                            )
                        )
                    )
                )

            return items
        }

        upload()
            .then(items=>{
                setItems(items)
                setStatus('loaded')
            })
            .catch(e=>{
                setStatus('error')
                setError(e)
            })
    }, [values.length])

    return [status, items, error]
}