import React, { useEffect } from 'react'
import Api from 'data/modules/api'

export default function useUrlExists(provider, navigation) {
    useEffect(()=>{
        if (!provider.type) return

        async function now() {
            if (provider.type == 'url') {
                //check if url already exists
                try{
                    const { ids=[] } = await Api._post('check/url', { url: provider.values[0].link })

                    //already saved
                    if (ids.length)
                        return navigation.replace('create', provider)
                } catch(e) {
                    console.error(e)
                }
            }
        }

        now()
    }, [provider])
}