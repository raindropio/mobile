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
import { useLayoutEffect } from 'react';
import { Platform } from 'react-native'
import t from 't'
import { useNavigation } from '@react-navigation/native'
import { ButtonsWrap, Button } from './style'

export function Buttons({ children, left=false }) {
    const navigation = useNavigation()
    const key = left ? 'headerLeft' : 'headerRight'

    //useLayoutEffect (not useEffect) so setOptions runs in the same commit
    //phase as the render — avoids a race in react-native-screens where the
    //old header subview is still attached to the previous Toolbar when the
    //new one tries to attach it ("The specified child already has a parent").
    useLayoutEffect(()=>{
        navigation.setOptions({
            [key]: children ? ()=>(
                <ButtonsWrap>
                    {children}
                </ButtonsWrap>
            ) : undefined
        })

        return ()=>
            navigation.setOptions({ [key]: undefined })
    }, [navigation, key, children])

    return null
}

export { Button, ButtonsWrap }

export const Back = Platform.select({
    ios: (props)=>(
        <Button 
            icon='arrow-left-s'
            size='32'
            color='text.secondary'
            style={{marginLeft:-10}}
            {...props} />
    ),
    android: (props)=>(
        <Button 
            icon='arrow-left'
            color='text.secondary'
            {...props} />
    )
})

export const Cancel = function(props) {
    return (
        <Button
            title={t.s('cancel')}
            color='text.secondary'
            {...props} />
    )
}

export const Done = Platform.select({
    ios: function(props) {
        return (
            <Button 
                title={t.s('done')}
                bold
                {...props} />
        )
    },

    android: function(props) {
        return (
            <Button 
                icon='close-circle'
                variant='fill'
                color='text.secondary'
                {...props} />
        )
    }
})