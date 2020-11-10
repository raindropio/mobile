import React from 'react'
import t from 't'
import { openURL } from 'modules/browser'

import Goto from 'co/common/goto'

function ImportItem({ last }){
    return (
        <Goto
            last={last}
            label={t.s('import')}
            icon='upload-cloud'
            color='purple'
            onPress={()=>
                openURL({
                    link: 'https://help.raindrop.io/article/17-importing-bookmarks',
                })
            } />
    )
}

export default ImportItem