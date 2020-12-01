import React from 'react'
import t from 't'
import { Wrap, Message } from './view/style'
import Button from 'co/button'

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
                
                <Button 
                    onPress={this.props.onClose}
                    title={t.s('close')} />
            </Wrap>
        )
    }
}