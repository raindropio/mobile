import React from 'react'
import Splitview from 'co/navigation/splitview'

import Collections from './collections'
import Browse from './browse'
import Search from './search'

export default function Space(props) {
    return (
        <Splitview.Navigator {...props}>
            <Splitview.Master name='collections' component={Collections} options={Collections.options} />
            <Splitview.Detail name='browse' component={Browse} options={Browse.options} initialParams={{spaceId: 0}} />
            <Splitview.Detail name='search' component={Search} options={Search.options} />
        </Splitview.Navigator>
    )
}