import React, { useEffect } from 'react'
import Api from 'data/modules/api'
import { data } from 'modules/extension'
import { withOverlay } from 'co/navigation/screen'

import { Wrap } from './style'
import { ActivityIndicator } from 'co/native'

function ExtensionLoading({ navigation }) {
    useEffect(()=>{
        async function now() {
            const provider = await data()

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

            //select folder
            navigation.replace('location', {
                ...provider,
                preventDuplicate: false
            })
        }

        now()
    }, [])

    return (
        <Wrap>
            <ActivityIndicator size='large' />
        </Wrap>
    )
}

export default withOverlay(ExtensionLoading, 280)