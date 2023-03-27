import { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native'

export default function WindowHeight({ height }) {
    const navigation = useNavigation()

    //change parent navigator height when screen is focused
    useEffect(()=>{
        function setHeight() {
            const parent = navigation.getParent()
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
        }

        setHeight()
        return navigation.addListener('focus', setHeight)
    }, [navigation, height])

    //remove styles on hide or unmount
    const removeStyle = useCallback(() =>{
        const parent = navigation.getParent()
        parent && parent.setOptions({ contentStyle:{} })
    }, [ navigation ])

    useEffect(()=>{
        const unsub = navigation.addListener('blur', removeStyle)
        return ()=>{
            removeStyle()
            unsub()
        }
    }, [navigation])

    return null
}