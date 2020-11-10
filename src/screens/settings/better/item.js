import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import Goto from 'co/common/goto'

function BetterItem({ last }){
    return (
        <Goto
            last={last}
            label={t.s('pro_nextFeatures')}
            icon='stack'
            onPress={()=>
                openURL({
                    link: 'https://raindropio.canny.io/feature-requests',
                })
            } />
    )
}

export default BetterItem