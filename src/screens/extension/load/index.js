import React, { useEffect } from 'react'
import Api from 'data/modules/api'
import { data } from 'modules/extension'

import { ActivityIndicator } from 'co/native'
import { Wrap, Backdrop, Body } from './style'

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
            <Backdrop onPress={navigation.goBack} />

            <Body>
                <ActivityIndicator size='large' />
            </Body>
        </Wrap>
    )
}

ExtensionLoading.options = {
    headerShown: false,
    cardStyle: {
        backgroundColor: 'transparent'
    }
}

export default ExtensionLoading