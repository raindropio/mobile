import React, { useEffect } from 'react'
import Splitview from 'co/navigation/splitview'
import { useSelector } from 'react-redux'

import { SpaceWrap } from './context'
import Home from './home'
import Browse from './browse'
import Search from './search'
import Fab from './fab'

function Space(props) {
    const spaceId = useSelector(state=>state.config.last_collection)

    useEffect(()=>{
        if (spaceId)
            props.navigation.navigate('browse', { spaceId })
    }, [])

    return (
        <SpaceWrap>
            <Splitview.Navigator {...props} >
                <Splitview.Master name='home' component={Home} options={Home.options} />
                <Splitview.Detail name='browse' component={Browse} options={Browse.options} initialParams={{ spaceId }} />
                <Splitview.Detail name='search' component={Search} options={Search.options} />
            </Splitview.Navigator>

            <Fab {...props} />
        </SpaceWrap>
    )
}

export default Space