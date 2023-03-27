import Stack from 'co/navigation/stack'

import Edit from './edit'

export default function Tag({ route: { params={} } }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name='edit' component={Edit} options={Edit.options} initialParams={params} />
        </Stack.Navigator>
    )
}