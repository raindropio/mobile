import React from 'react'
import _ from 'lodash-es'
import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'co/icon'
import Context from './context'

export const width = 80

const Touch = styled(RectButton)`
    background: ${({ theme, background='text.secondary' })=>theme.background[background] || _.get(theme, background)};
    width: ${width}px;
    height: 100%;
    align-items: center;
    justify-content: center;
`

export class Button extends React.PureComponent {
    static contextType = Context

    onPress = e=>{
        this.context.close && this.context.close()
        this.props.onPress(e)
    }

    render() {
        const { icon, variant, ...etc } = this.props

        return (
            <Touch {...etc} onPress={this.onPress}>
                <Icon 
                    name={icon}
                    color='background.regular'
                    variant={variant} />
            </Touch>
        )
    }
}