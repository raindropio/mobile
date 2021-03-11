import React from 'react'
import Height from 'co/navigation/height'

import { Window, Scroll, Message, IconWrap } from './style'
import Icon from 'co/icon'
import Button, { Buttons } from 'co/button'

export default class CustomConfirm extends React.PureComponent {
    state = {
        selected: -1
    }

    componentWillUnmount() {
        this.props.route.params.callback(this.state.selected)
    }

    render() {
        const { route: { params = {}}, navigation } = this.props
        const { message, buttons=['OK'] } = params

        return (
            <Window>
                <Height height={300} />

                <Scroll>
                    <IconWrap>
                        <Icon 
                            name='information'
                            variant='fill'
                            size={32}
                            color='accent' />
                    </IconWrap>

                    <Message>{message}</Message>
                    
                    {buttons.map((label, index)=>(
                        <Buttons key={label} vertical>
                            <Button 
                                background={index ? 'alternative' : 'color.accent'}
                                color={index ? 'color.accent' : 'background.regular'}
                                title={label}
                                bold
                                onPress={()=>this.setState({ selected: index }, navigation.goBack)} />
                        </Buttons>
                    ))}
                </Scroll>
            </Window>
        )
    }
}