import t from 't'
import React from 'react'
import { Wrap, Message } from './style'
import Button from 'co/button'

function ExtensionAuth({ navigation }) {
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
ExtensionAuth.options = {
    headerShown: false
}

export default ExtensionAuth