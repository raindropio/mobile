import React, { useEffect } from 'react'
import Api from 'data/modules/api'
import { data } from 'modules/extension'

import { ActivityIndicator } from 'co/native'
import Header from 'co/navigation/header'
import Height from 'co/navigation/height'
import { Wrap } from './style'

function ExtensionLoading({ navigation }) {
    useEffect(()=>{
        async function now() {
            const provider = await data()

            if (provider.type == 'url') {
                //check if url already exists
                const { ids=[] } = await Api._post('check/url', { url: provider.values[0].link })

                //already saved
                if (ids.length)
                    return navigation.replace('create', provider)
            }

            //select folder
            navigation.replace('location', provider)
        }

        now()
    }, [])

    return (
        <Wrap>
            <Height height={280} />

            <ActivityIndicator size='large' />

            <Header.Buttons left />
            <Header.Buttons />
        </Wrap>
    )
}

ExtensionLoading.options = {
    headerTransparent: true,
    title: ''
}

export default ExtensionLoading