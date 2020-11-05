import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import { Image } from 'react-native'
import Goto from 'co/common/goto'

function DesktopItem({ last }){
    return (
        <Goto
            last={last}
            label={'Web '+t.s('und')+' '+t.s('pro_desktop')}
            iconComponent={<Image source={require('assets/images/desktop.png')} />}
            onPress={()=>
                openURL({
                    link: 'https://help.raindrop.io/article/35-web-and-desktop-app',
                })
            } />
    )
}

export default DesktopItem