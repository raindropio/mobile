import React from 'react'
import Stack from 'co/navigation/stack'

import Web from './web'

function Preview() {
    return (
        <Stack.Navigator notmodal>
            <Stack.Screen name='web' component={Web} options={Web.options} />
        </Stack.Navigator>
    )
}

Preview.options = {
    stackPresentation: 'push'
}

export default Preview