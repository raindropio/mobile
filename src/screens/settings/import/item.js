import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import { Image } from 'react-native'
import Goto from 'co/common/goto'

function ImportItem({ last }){
    return (
        <Goto
            last={last}
            label={t.s('import')}
            iconComponent={<Image source={require('assets/images/import.png')} />}
            onPress={()=>
                openURL({
                    link: 'https://help.raindrop.io/article/17-importing-bookmarks',
                })
            } />
    )
}

export default ImportItem