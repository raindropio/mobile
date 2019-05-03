import React from 'react'
import t from 't'
import { Wrap, Message } from './view/style'
import { ButtonAction } from 'co/common/button'

export default class NotSupported extends React.PureComponent {
    static defaultProps = {
        message: '',
        type: ''
    }

    render() {
        return (
            <Wrap>
                <Message>
                    {t.s('supportOnlyUrls')}
                </Message>
                <Message>
                    {this.props.message.toString()} ({this.props.type.toString()})
                </Message>
                
                <ButtonAction onPress={this.props.onClose}>
                    {t.s('close')}
                </ButtonAction>
            </Wrap>
        )
    }
}