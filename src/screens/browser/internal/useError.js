import { useCallback } from 'react'
import t from 't'
import { Linking } from 'react-native'

export default function useError(ref, navigation) {
    return useCallback(({ nativeEvent })=>{
        navigation.navigate('overlay', {
            screen: 'confirm',
            params: {
                type: 'warning',
                message: `Unable to open ${nativeEvent.url}\n${nativeEvent.description}`,
                buttons: [t.s('openInBrowser'), t.s('tryAgain')],
                callback: (pressed)=>{
                    switch (pressed) {
                        case 0:
                            Linking.openURL(nativeEvent.url)
                            break;
                    
                        case 1:
                            ref.current?.reload()
                            break;
                    }
                }
            }
        })
    }, [navigation, ref])
}