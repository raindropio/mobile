import * as React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function withNavigation(Component) {
    return function(props) {
        const navigation = useNavigation();
      
        return (
            <Component 
                navigation={navigation}
                {...props} />
        )
    }
}