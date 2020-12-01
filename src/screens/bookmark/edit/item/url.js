import t from 't'
import React from 'react'
import { InputURL } from 'co/form'
import Goto from 'co/goto'

export default function BookmarkEditURL({ item: { link }, onChange, onSubmit, last }) {
    const [edit, setEdit] = React.useState(false)

    const onEditPress = React.useCallback(()=>
        setEdit(true),
        []
    )

    const onChangeText = React.useCallback(link=>
        onChange({link}),
        [onChange]
    )

    if (!edit)
        return (
            <Goto
                last={last}
                icon='link'
                action=''
                label={link}
                onPress={onEditPress} />
        )

    return (
        <InputURL 
            autoFocus
            last={last}
            value={link}
            placeholder={t.s('enterLinkDescription')}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit} />
    )
}