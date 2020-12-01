/*
    <Button
        icon='star'
        ...<Icon props...
        title=''
        bold={false}
        disabled={false}
        background
        onPress={} />
*/
import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'co/icon'
import { Buttons, ButtonTouch, ButtonText } from './style'

export { Buttons }

export default function Button({ icon, title, bold=false, size, variant, ...etc }) {
    let { color, background } = etc

    //set white text color when background is set and no specific color
    if (background && !color)
        color = 'white'

    //disabled
    if (etc.disabled){
        color = 'text.disabled'

        if (background)
            background = 'disabled'
    }

    //default color is accent
    if (!color)
        color = 'accent'

    return (
        <ButtonTouch 
            {...etc} 
            as={background ? RectButton : undefined}
            background={background}>
            {icon ? (
                <Icon 
                    name={icon}
                    size={size}
                    variant={variant}
                    color={color} />
            ) : null}

            {title ? (
                <ButtonText 
                    bold={bold}
                    color={color}>
                    {title}
                </ButtonText>
            ) : null}
        </ButtonTouch>
    )
}