import t from 't'
import React from 'react'

import { ScrollForm, Form, Input } from 'co/style/form'
import { ButtonLink } from 'co/common/button'

export default ({ title, onSave, onChange, onRemove })=>(
    <ScrollForm>
        <Form first>
            <Input 
                last
                value={title}
                placeholder={t.s('enterTitle')}
                returnKeyType='done'
                onChangeText={title=>onChange({title})}
                onSubmitEditing={onSave} />
        </Form>

        {onRemove ? <ButtonLink danger onPress={onRemove}>{t.s('remove')} {t.s('group').toLowerCase()}</ButtonLink> : null}
    </ScrollForm>
)