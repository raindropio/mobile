import { Button, Label } from './action.style'
import Icon from 'co/icon'

export default function SelectModeAction({ disabled, icon, title, onPress }) {
    let color = disabled ? 'text.disabled' : 'color.accent'

    return (
        <Button 
            pointerEvents={disabled ? 'none' : undefined}
            onPress={onPress}>
            <Icon 
                name={icon}
                color={color} />

            <Label color={color}>{title}</Label>
        </Button>
    )
}