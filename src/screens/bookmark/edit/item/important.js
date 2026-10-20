import t from 't'
import Toggle from 'co/form/toggle'

export default function BookmarkEditTagsField({ last=false, item: { important }, onChange }) {
    const onToggle = ()=>
        onChange({ important: !important })

    return (
        <Toggle 
            last={last}
            value={important}
            icon='heart-3'
            variant={important ? 'fill' : undefined}
            onChange={onToggle}
            label={t.s('favorites')} />
    )
}