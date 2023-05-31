import { useCallback } from 'react';
import t from 't'
import { NoteInput } from './note.style'

export default function BookmarkEditNote({ item: { note }, focus, status, onChange }) {
    const onChangeNote = useCallback(note=>{
        onChange({ note })
    }, [onChange])

    return (
        <NoteInput 
            last 
            optional
            value={note}
            multiline={true}
            blurOnSubmit={false}
            autoCorrect={false}
            spellCheck={false}
            maxHeight={168}
            enablesReturnKeyAutomatically={false}
            autoFocus={focus=='note'}
            placeholder={t.s('note')}
            selectTextOnFocus={status=='new'}
            onChangeText={onChangeNote} />
    )
}