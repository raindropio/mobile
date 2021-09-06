import t from 't'
import React from 'react'

import { ScrollForm, Form, Input } from 'co/form'
import Button from 'co/button'

export default ({tagName, onSave, onChange, onRemove})=>(
    <ScrollForm>
        <Form>
            <Input 
                heading
                last
                autoFocus={true}
                value={tagName}
                returnKeyType='done'
                onChangeText={tagName=>onChange({tagName})}
                onSubmitEditing={onSave} />
        </Form>

        {onRemove ? <Button danger onPress={onRemove} title={t.s('remove')} /> : null}
    </ScrollForm>
)