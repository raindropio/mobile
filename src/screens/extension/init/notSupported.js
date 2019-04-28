import React from 'react'
import t from 't'
import { Wrap, Message } from './view/style'
import { ButtonAction } from 'co/common/button'

export default class NotSupported extends React.PureComponent {
    render() {
        return (
            <Wrap>
                <Message>
                    {t.s('supportOnlyUrls')}
                </Message>
                <Message>
                    {this.props.value.toString()} ({this.props.type.toString()})
                </Message>
                
                <ButtonAction onPress={this.props.onClose}>
                    {t.s('close')}
                </ButtonAction>
            </Wrap>
        )
    }
}