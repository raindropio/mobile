import { useState, useEffect } from 'react'
import { data } from 'modules/extension'

export default function useProvider() {
    const [provider, setProvider] = useState(null)

    useEffect(()=>{
        data()
            .then(setProvider)
            .catch(setProvider)
    }, [])

    return provider
}