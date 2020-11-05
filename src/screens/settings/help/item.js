import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import { Image } from 'react-native'
import Goto from 'co/common/goto'

function HelpItem({ last }){
    return (
        <Goto
            last={last}
            label={t.s('help')}
            iconComponent={<Image source={require('assets/images/howto.png')} />}
            onPress={()=>
                openURL({
                    link: 'https://help.raindrop.io/category/24-mobile-app',
                })
            } />
    )
}

export default HelpItem