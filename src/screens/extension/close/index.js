import React from 'react'
import { close } from 'modules/extension'

function Close({ navigation }) {
    React.useEffect(() => 
        navigation.addListener('focus', ()=>close())
    , [navigation]);

    return null
}

Close.options = {
    presentation: 'transparentModal'
}

export default Close