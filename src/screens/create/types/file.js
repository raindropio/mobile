import React, { useEffect, useState } from 'react'
import _ from 'lodash-es'
import { useDispatch } from 'react-redux'
import { oneUpload } from 'data/actions/bookmarks'

export default function useSave(values, { autoCreate=true }) {
    const dispatch = useDispatch()

    const [items, setItems] = useState([])
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState(null)

    useEffect(()=>{
        if (autoCreate === false){
            setStatus('new')
            return
        }

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

            return _.flatten(items)
        }

        upload()
            .then(items=>{
                setItems(items)
                setStatus('loaded')
            })
            .catch(e=>{
                setError(e)
                setStatus('error')
            })
    }, [values.length, autoCreate])

    return [status, items, error]
}