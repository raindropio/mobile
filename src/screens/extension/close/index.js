import React from 'react'
import { close } from 'modules/extension'

function Close({ navigation }) {
    React.useEffect(() => 
        navigation.addListener('focus', ()=>close())
    , [navigation]);

    return null
}

Close.options = {
    contentStyle: {
        backgroundColor: 'transparent'
    },
    headerShown: false,
    stackAnimation: 'fade',
    replaceAnimation: 'push'
}

export default Close