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
import { useNavigation } from '@react-navigation/native'
import Icon from 'co/icon'
import { Wrap, ButtonWrap, ButtonTouch, ButtonText } from './style'

//specify any props to optimize rendering and update only on change
export function Buttons({ children, ...props }) {
    const navigation = useNavigation()

    //update buttons in header
    const values = Object.values(props)
    React.useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>(
                <Wrap>
                    {children}
                </Wrap>
            )
        })

        return ()=>
            navigation.setOptions({
                headerRight: undefined
            })
    }, values.length ? values : undefined)

    return null
}

export function Button({ icon, title, color='accent', bold=false, ...etc }) {
    return (
        <ButtonTouch {...etc}>
            <ButtonWrap>
                {icon ? (
                    <Icon 
                        name={icon}
                        color={etc.disabled ? 'text.disabled' : color} />
                ) : null}

                {title ? (
                    <ButtonText 
                        bold={bold}
                        color={etc.disabled ? 'text.disabled' : color}>
                        {title}
                    </ButtonText>
                ) : null}
            </ButtonWrap>
        </ButtonTouch>
    )
}