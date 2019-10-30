import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import { Wrap, Message } from './style'
import { ButtonAction } from 'co/common/button'

export default class ExtensionAuth extends React.PureComponent {
    static options() {
        return {
            topBar: {
                visible: false,
                drawBehind: true
            }
        }
    }

    onClose = ()=>{
        Navigation.close(this.props)
    }
    
    render() {
        return (
            <Wrap>
                <Message>
                    {t.s('startToSave')}
                </Message>
                
                <ButtonAction onPress={this.onClose}>
                    {t.s('close')}
                </ButtonAction>
            </Wrap>
        )
    }
}