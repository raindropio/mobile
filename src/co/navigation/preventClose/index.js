/*
    <PreventClose 
        onBeforeClose={async function -> true/false should close now?} />
*/

import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from 'styled-components'

function PreventClose({ back=true, gesture=true, onBeforeClose }) {
    const navigation = useNavigation()
    const { isExtension } = React.useContext(ThemeContext)

    const { disableDismissGesture, enableDismissGesture } = useMemo(()=>{
        if (!isExtension) return {}
        return require('modules/extension')
    }, [isExtension])

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

            disableDismissGesture && disableDismissGesture() 

            return ()=>{
                navigation.setOptions({ gestureEnabled: true })
                const parent = navigation.dangerouslyGetParent()
                parent && parent.setOptions({ gestureEnabled: true })

                enableDismissGesture && enableDismissGesture()
            }
        },
        [navigation]
    )

    return null
}

export default React.memo(PreventClose)