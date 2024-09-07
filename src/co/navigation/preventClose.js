/*
    <PreventClose 
        onBeforeClose={async function -> true/false should close now?} />
*/

import { useEffect, memo } from 'react';
import { useNavigation } from '@react-navigation/native'

function PreventClose({ back=true, onBeforeClose }) {
    const navigation = useNavigation()

    //prevent back button
    useEffect(
        () => navigation.addListener('beforeRemove', (e) => {
            if (!back) return

            e.preventDefault()

            if (typeof onBeforeClose == 'function'){
                const closeAction = e.data.action

                onBeforeClose().then(closeNow=>{
                    if (closeNow)
                        navigation.dispatch(closeAction)
                })
            }
        }),
        [navigation, onBeforeClose, back]
    )

    return null
}

export default memo(PreventClose)