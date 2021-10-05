import React from 'react'
import { close } from 'modules/extension'

function Close({ navigation }) {
    React.useEffect(() => 
        navigation.addListener('focus', ()=>close())
    , [navigation]);

    return null
}

Close.options = {
    headerShown: false,
    cardStyle: {
        backgroundColor: 'transparent'
    }
}

export default Close