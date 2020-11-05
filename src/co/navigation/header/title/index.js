import React from 'react'
import { useNavigation } from '@react-navigation/native'

//specify any props to optimize rendering and update only on change
export function Title({ children, ...props }) {
    const navigation = useNavigation()

    //update title in header
    const values = Object.values(props)
    React.useEffect(()=>{
        navigation.setOptions({
            headerTitle: typeof children == 'string' ? children : ()=>children
        })
    }, [values.length ? values : undefined])

    return null
}