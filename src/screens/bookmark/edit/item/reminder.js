import t from 't'
import { useSelector } from 'react-redux'
import { isPro } from 'data/selectors/user'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

import { shortDateTime } from 'modules/format/date'
import Goto from 'co/goto'

export default function BookmarkEditActionReminder({ item: { reminder }, onChange }) {
    const pro = useSelector(state=>isPro(state))

    const onSetDate = date=>
        onChange({ reminder: { date } })

    const onClear = ()=>
        onSetDate(undefined)

    //Android has no combined datetime dialog: pick date first, then time
    const onShowPick = ()=>{
        const now = new Date()
        const current = reminder?.date ? new Date(reminder.date) : now
        const buttons = {
            positiveButton: { label: t.s('save') },
            negativeButton: { label: t.s('cancel') }
        }

        DateTimePickerAndroid.open({
            mode: 'date',
            value: current,
            minimumDate: now,
            ...buttons,
            onValueChange: (_, date)=>{
                const withTime = new Date(date)
                withTime.setHours(current.getHours(), current.getMinutes(), 0, 0)

                DateTimePickerAndroid.open({
                    mode: 'time',
                    value: withTime,
                    ...buttons,
                    onValueChange: (_, time)=>onSetDate(time)
                })
            }
        })
    }

    if (!pro)
        return (
            <Goto
                label={t.s('reminders')}
                subLabel={t.s('onlyInPro')}
                icon='notification-4'
                action=''
                onPress={()=>{}}
                />
        )

    return (
        <Goto 
            label={t.s('reminders')}
            subLabel={reminder?.date ? shortDateTime(reminder.date) : ''}
            icon='notification-4'
            variant={reminder?.date ? 'fill' : undefined}
            onPress={onShowPick}
            action={reminder?.date ? 'close-circle': undefined}
            actionVariant={reminder?.date ? 'fill' : undefined}
            onActionPress={reminder?.date ? onClear : undefined} />
    )
}