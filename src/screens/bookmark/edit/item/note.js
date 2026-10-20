import t from 't'
import { NoteInput } from './note.style'

export default function BookmarkEditNote({ item: { note }, focus, status, onChange }) {
    const onChangeNote = note=>
        onChange({ note })

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
            onChangeText={onChangeNote} />
    )
}