import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import Goto from 'co/common/goto'

function HelpItem({ last }){
    return (
        <Goto
            last={last}
            label={t.s('help')}
            icon='question'
            onPress={()=>
                openURL({
                    link: 'https://help.raindrop.io/category/24-mobile-app',
                })
            } />
    )
}

export default HelpItem