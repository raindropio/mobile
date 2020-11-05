import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import { Image } from 'react-native'
import Goto from 'co/common/goto'

function SupportItem({ last }){
    return (
        <Goto
            last={last}
            label={t.s('support')}
            iconComponent={<Image source={require('assets/images/support.png')} />}
            onPress={()=>
                openURL({
                    link: 'https://help.raindrop.io/contact',
                })
            } />
    )
}

export default SupportItem