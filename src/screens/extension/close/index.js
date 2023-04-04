import { useEffect } from 'react';
import { close } from 'modules/extension'

function Close({ navigation }) {
    useEffect(() => 
        navigation.addListener('focus', ()=>close())
    , [navigation]);

    return null
}

Close.options = {
    headerShown: false
}

export default Close