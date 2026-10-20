import { useContext } from 'react'
import _ from 'lodash-es'
import styled from 'styled-components/native'
import { Touchable } from 'react-native-gesture-handler'
import Icon from 'co/icon'
import Context from './context'

export const width = 72

const Touch = styled(Touchable).attrs({ androidRipple: {} })`
    background: ${({ theme, background='text.secondary' })=>theme.background[background] || _.get(theme, background)};
    width: ${width}px;
    height: 100%;
    align-items: center;
    justify-content: center;
`

export function Button({ icon, variant, color, onPress, ...etc }) {
    const context = useContext(Context)

    const onButtonPress = e=>{
        context.close && context.close()
        onPress(e)
    }

    return (
        <Touch {...etc} onPress={onButtonPress}>
            <Icon 
                name={icon}
                color={color||'white'}
                variant={variant} />
        </Touch>
    )
}