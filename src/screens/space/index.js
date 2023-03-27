import Splitview from 'co/navigation/splitview'

import { SpaceWrap } from './context'
import Home from './home'
import Browse from './browse'
import Search from './search'

export default function Space(props) {
    const { route: { params } } = props

    return (
        <SpaceWrap>
            <Splitview.Navigator {...props}>
                <Splitview.Master name='home' component={Home} options={Home.options} />
                <Splitview.Detail name='browse' component={Browse} options={Browse.options} initialParams={params} />
                <Splitview.Detail name='search' component={Search} options={Search.options} />
            </Splitview.Navigator>
        </SpaceWrap>
    )
}