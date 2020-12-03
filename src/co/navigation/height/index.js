import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function WindowHeight({ height }) {
    const navigation = useNavigation()

    //change parent navigator height when screen is focused
    React.useEffect(()=>{
        navigation.addListener('focus', () =>{
            const parent = navigation.dangerouslyGetParent()
            parent && parent.setOptions({
                contentStyle: {
                    height,
                    flex: 0,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            })
        })
    }, [navigation, height])

    //remove styles on hide or unmount
    const removeStyle = React.useCallback(() =>{
        const parent = navigation.dangerouslyGetParent()
        parent && parent.setOptions({ contentStyle:{} })
    }, [ navigation ])

    React.useEffect(()=>{
        navigation.addListener('blur', removeStyle)
        return ()=>removeStyle()
    }, [navigation])

    return null
}