import t from 't'
import React from 'react'

import { ScrollForm, Form, Input } from 'co/style/form'
import { ButtonLink } from 'co/common/button'

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

        {onRemove ? <ButtonLink danger onPress={onRemove}>{t.s('remove')}</ButtonLink> : null}
    </ScrollForm>
)