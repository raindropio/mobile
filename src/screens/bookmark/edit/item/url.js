import t from 't'
import { useState } from 'react'
import { LayoutAnimation } from 'react-native'
import { InputURL } from 'co/form'
import Goto from 'co/goto'

export default function BookmarkEditURL({ item: { link }, onChange, onSubmit, last }) {
    const [edit, setEdit] = useState(false)

    const onEditPress = ()=>{
        LayoutAnimation.easeInEaseOut()
        setEdit(true)
    }

    const onChangeText = link=>
        onChange({link})

    const onBlur = ()=>{
        LayoutAnimation.easeInEaseOut()
        setEdit(false)
    }

    if (!edit)
        return (
            <Goto
                last={last}
                icon='global'
                action=''
                label={link||'URL'}
                onPress={onEditPress} />
        )

    return (
        <InputURL 
            autoFocus
            last={last}
            value={link}
            placeholder={t.s('enterUrl')}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            onBlur={onBlur} />
    )
}