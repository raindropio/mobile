import { useEffect } from 'react';
import { close } from 'modules/extension'

function Close({ navigation }) {
    useEffect(() => 
        navigation.addListener('focus', ()=>close())
    , [navigation]);

    return null
}

Close.options = {
    headerShown: false,
    stackPresentation: 'transparentModal',
    stackAnimation: 'fade',
    contentStyle: { opacity: 0 }
}

export default Close