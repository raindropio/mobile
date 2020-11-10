import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import Goto from 'co/common/goto'

function SupportItem({ last }){
    return (
        <Goto
            last={last}
            label={t.s('support')}
            icon='questionnaire'
            onPress={()=>
                openURL({
                    link: 'https://help.raindrop.io/contact',
                })
            } />
    )
}

export default SupportItem