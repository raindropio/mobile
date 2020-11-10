import React from 'react'
import Splitview from 'co/navigation/splitview'

import { SpaceWrap } from './context'
import Collections from './collections'
import Browse from './browse'
import Search from './search'
import Fab from './fab'

const emptyObject = {}

export const getInitialState = (last_collection)=>{
    if (last_collection)
        return {
            routes: [{
                name: 'space',
                state: {
                    routes: [
                        { name: 'collections' },
                        { name: 'browse', params: { spaceId: last_collection } },
                    ],
                },
            }]
        }
}

export default function Space(props) {
    return (
        <SpaceWrap>
            <Splitview.Navigator {...props}>
                <Splitview.Master name='collections' component={Collections} options={Collections.options} />
                <Splitview.Detail name='browse' component={Browse} options={Browse.options} initialParams={emptyObject} />
                <Splitview.Detail name='search' component={Search} options={Search.options} />
            </Splitview.Navigator>

            <Fab {...props} />
        </SpaceWrap>
    )
}