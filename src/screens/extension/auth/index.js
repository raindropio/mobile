import t from 't'
import React from 'react'
import { close } from 'modules/extension'
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
    
    render() {
        return (
            <Wrap>
                <Message>
                    {t.s('startToSave')}
                </Message>
                
                <ButtonAction onPress={()=>close()}>
                    {t.s('close')}
                </ButtonAction>
            </Wrap>
        )
    }
}