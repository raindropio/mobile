import Stack from 'co/navigation/stack'

import { SpaceWrap } from './context'
import Home from './home'
import Browse from './browse'
import Search from './search'

export default function Space(props) {
    const { route: { params } } = props

    return (
        <SpaceWrap>
            <Stack.Navigator {...props}>
                <Stack.Screen name='home' component={Home} options={Home.options} />
                <Stack.Screen name='browse' component={Browse} options={Browse.options} initialParams={params} />
                <Stack.Screen name='search' component={Search} options={Search.options} />
            </Stack.Navigator>
        </SpaceWrap>
    )
}