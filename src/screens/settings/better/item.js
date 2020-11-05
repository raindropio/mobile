import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import { Image } from 'react-native'
import Goto from 'co/common/goto'

function BetterItem({ last }){
    return (
        <Goto
            last={last}
            label={t.s('pro_nextFeatures')}
            iconComponent={<Image source={require('assets/images/vote.png')} />}
            onPress={()=>
                openURL({
                    link: 'https://raindropio.canny.io/feature-requests',
                })
            } />
    )
}

export default BetterItem