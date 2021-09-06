import React from 'react'
import Splitview from 'co/navigation/splitview'
import { useSelector } from 'react-redux'

import { SpaceWrap } from './context'
import Home from './home'
import Browse from './browse'
import Search from './search'
import Fab from './fab'

export const useInitialState = ()=>{
    const last_collection = useSelector(state=>state.config.last_collection)

    if (last_collection)
        return {
            routes: [{
                name: 'space',
                state: {
                    routes: [
                        { name: 'home' },
                        { name: 'browse', params: { spaceId: last_collection } },
                    ],
                },
            }]
        }

    return undefined
}

export default function Space(props) {
    const { route: { params={} } } = props

    return (
        <SpaceWrap>
            <Splitview.Navigator {...props}>
                <Splitview.Master name='home' component={Home} options={Home.options} />
                <Splitview.Detail name='browse' component={Browse} options={Browse.options} initialParams={{ spaceId: params.last_collection }} />
                <Splitview.Detail name='search' component={Search} options={Search.options} />
            </Splitview.Navigator>

            <Fab {...props} />
        </SpaceWrap>
    )
}