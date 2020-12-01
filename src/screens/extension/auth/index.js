import t from 't'
import React from 'react'
import { Wrap, Message } from './style'
import Button from 'co/button'

export default function ExtensionAuth({ navigation }) {
    return (
        <Wrap>
            <Message>
                {t.s('startToSave')}
            </Message>
            
            <Button 
                onPress={navigation.goBack}
                title={t.s('close')} />
        </Wrap>
    )
}