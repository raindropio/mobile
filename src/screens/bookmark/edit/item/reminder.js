import { useState, useCallback } from 'react';
import t from 't'
import DatePicker from 'react-native-date-picker'

import { shortDateTime } from 'modules/format/date'
import Goto from 'co/goto'

export default function BookmarkEditActionReminder({ item: { reminder }, onChange }) {
    const [pick, setPick] = useState(false)

    const onShowPick = useCallback(()=>setPick(true), [setPick])
    const onHidePick = useCallback(()=>setPick(false), [setPick])

    const onSetDate = useCallback(date=>{
        onHidePick()
        onChange({ reminder: { date } })
    }, [onHidePick, onChange])

    const onClear = useCallback(()=>
        onSetDate(undefined), [onSetDate]
    )

    return (<>
        <Goto 
            label={t.s('reminder')}
            subLabel={reminder?.date ? shortDateTime(reminder.date) : ''}
            icon='notification'
            variant={reminder?.date ? 'fill' : undefined}
            onPress={onShowPick}
            action={reminder?.date ? 'close-circle': undefined}
            actionVariant={reminder?.date ? 'fill' : undefined}
            onActionPress={reminder?.date ? onClear : undefined} />

        <DatePicker
            modal
            open={pick}
            date={reminder?.date ? new Date(reminder?.date) : new Date()}
            minimumDate={new Date()}
            title={t.s('reminder')}
            confirmText={t.s('save')}
            cancelText={t.s('cancel')}
            onConfirm={onSetDate}
            onCancel={onHidePick} />
    </>)
}