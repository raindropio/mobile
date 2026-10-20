import { useRef, useState, useEffect } from 'react'
import t from 't'

import HighlighText from 'co/highlights/text'
import { ItemDescription } from 'co/style/item'
import { Form } from 'co/form'
import Button from 'co/button'
import { ShortDate } from 'modules/format/date'
import { TextWrap, Note, Buttons, Date } from './style'

const colors = ['yellow', 'blue', 'green', 'red']

export default function HighlightsItemView({ text, color, created, onChange, onRemove, ...etc }) {
    //colors
    const [allColors, setAllColors] = useState(false)
    const [prevColor, setPrevColor] = useState(color)
    if (color != prevColor) {
        setPrevColor(color)
        setAllColors(false)
    }
    const onToggleAllColors = ()=>setAllColors(!allColors)
    
    //note input
    const [note, setNote] = useState(etc.note)
    const [prevNote, setPrevNote] = useState(etc.note)
    if (etc.note != prevNote) {
        setPrevNote(etc.note)
        setNote(etc.note)
    }
    const onChangeNote = note=>setNote(note)

    //submit
    const onSubmitNote = e=>onChange({ note: e.nativeEvent.text })

    //confirm remove
    const [confirmRemove, setConfirmRemove] = useState(false)
    const onConfirmRemove = ()=>confirmRemove ? onRemove() : setConfirmRemove(true)

    //autosave on close
    const _note = useRef('')
    useEffect(()=>{ _note.current=note }, [note])
    useEffect(()=>()=>{ onChange({ note: _note.current }) }, [onChange])

    return (
        <Form>
            <TextWrap>
                <HighlighText color={color}>
                    <ItemDescription>
                        {text}
                    </ItemDescription>
                </HighlighText>
            </TextWrap>

            <Note
                value={note}
                placeholder={`${t.s('add')} ${t.s('note').toLowerCase()}…`}
                multiline
                enablesReturnKeyAutomatically={false}
                onChangeText={onChangeNote}
                onEndEditing={onSubmitNote} />

            <Buttons>
                <Date>
                    <ShortDate date={created} />
                </Date>

                {allColors ? colors.map(c=>
                    c != color ? (
                        <Button
                            key={c}
                            icon='checkbox-blank-circle'
                            color={c}
                            variant='fill'
                            onPress={()=>onChange({ color: c })} />
                    ) : null
                ) : null}

                <Button
                    icon='checkbox-blank-circle'
                    color={color||'yellow'}
                    variant='fill'
                    onPress={onToggleAllColors} />

                <Button 
                    icon={confirmRemove ? 'delete-bin-2' : 'delete-bin'}
                    color={confirmRemove ? 'danger' : 'text.secondary'}
                    variant={confirmRemove ? 'fill' : undefined}
                    onPress={onConfirmRemove} />
            </Buttons>
        </Form>
    )
}