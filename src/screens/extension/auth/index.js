import t from 't'
import React from 'react'
import { Wrap, Message } from './style'
import { ButtonAction } from 'co/common/button'

export default function ExtensionAuth({ navigation }) {
    return (
        <Wrap>
            <Message>
                {t.s('startToSave')}
            </Message>
            
            <ButtonAction onPress={navigation.goBack}>
                {t.s('close')}
            </ButtonAction>
        </Wrap>
    )
}