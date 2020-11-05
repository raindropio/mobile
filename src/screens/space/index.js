import React from 'react'
import Splitview from 'co/navigation/splitview'

import { SpaceWrap } from './context'
import Collections from './collections'
import Browse from './browse'
import Search from './search'
import Fab from './fab'

export default function Space(props) {
    return (
        <SpaceWrap>
            <Splitview.Navigator {...props}>
                <Splitview.Master name='collections' component={Collections} options={Collections.options} />
                <Splitview.Detail name='browse' component={Browse} options={Browse.options} initialParams={{spaceId: 0}} />
                <Splitview.Detail name='search' component={Search} options={Search.options} />
            </Splitview.Navigator>

            <Fab {...props} />
        </SpaceWrap>
    )
}