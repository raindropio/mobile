/*
    Place inside of render()!
    <Buttons>
        <Button
            icon='star'
            title=''
            bold={false}
            disabled={false}
            onPress={} />
    </Buttons>
*/
import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import { useNavigation } from '@react-navigation/native'
import { ButtonsWrap, Button } from './style'

//specify any props to optimize rendering and update only on change
export function Buttons({ children, left=false, ...props }) {
    const navigation = useNavigation()

    //update buttons in header
    const values = Object.values(props)
    React.useEffect(()=>{
        navigation.setOptions({
            [left ? 'headerLeft' : 'headerRight']: ()=>(
                <ButtonsWrap>
                    {children}
                </ButtonsWrap>
            )
        })

        return ()=>
            navigation.setOptions({
                [left ? 'headerLeft' : 'headerRight']: undefined
            })
    }, values.length ? values : undefined)

    return null
}

export { Button, ButtonsWrap }

export const Cancel = Platform.select({
    ios: function(props) {
        return (
            <Button
                title={t.s('cancel')}
                {...props} />
        )
    },

    android: function(props) {
        return (
            <Button
                icon='arrow-left'
                color='text.secondary'
                {...props} />
        )
    }
})