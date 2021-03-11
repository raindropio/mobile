/*
    <PreventClose 
        onBeforeClose={async function -> true/false should close now?} />
*/

import React from 'react'
import { useNavigation } from '@react-navigation/native'

function PreventClose({ back=true, gesture=true, onBeforeClose }) {
    const navigation = useNavigation()

    //prevent back button
    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
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
        [navigation]
    )

    //disable gesture
    React.useEffect(
        ()=>{
            if (!gesture)
                return
                
            navigation.setOptions({ gestureEnabled: false })
            const parent = navigation.dangerouslyGetParent()
            parent && parent.setOptions({ gestureEnabled: false })

            return ()=>{
                navigation.setOptions({ gestureEnabled: true })
                const parent = navigation.dangerouslyGetParent()
                parent && parent.setOptions({ gestureEnabled: true })
            }
        },
        [navigation]
    )

    return null
}

export default React.memo(PreventClose)