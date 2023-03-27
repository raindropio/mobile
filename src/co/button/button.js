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
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'co/icon'
import { ButtonTouch, ButtonText, ButtonGap, ButtonBadge } from './button.style'

export function Button({ icon, title, bold=(Platform.OS=='android'), badge, size, fontSize='primary', variant, vertical=false, ...etc }) {
    let { color, background } = etc

    //set white text color when background is set and no specific color
    if (background && !color)
        color = 'background.regular'

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
            vertical={vertical}
            as={background ? RectButton : undefined}
            background={background}>
            {icon ? (
                <Icon 
                    name={icon}
                    size={size}
                    variant={variant}
                    color={color} />
            ) : null}

            {icon && title ? <ButtonGap vertical={vertical} /> : null}

            {title ? (
                <ButtonText 
                    bold={bold}
                    color={color}
                    fontSize={fontSize}>
                    {title}
                </ButtonText>
            ) : null}

            {badge ? (
                <ButtonBadge>{badge}</ButtonBadge>
            ) : null}
        </ButtonTouch>
    )
}