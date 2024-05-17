import t from 't'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
	EmptyImageIcon
} from 'co/style/empty'

export default function TagsPickerAllEmpty({ selected, value }) {
    if (value || !selected.length)
        return null

    return (
        <EmptyView>
            <EmptyImageIcon 
                name='hashtag' 
                color='tag'
                size='48' />

            <EmptyTitle>{`${selected.length} ${t.s('selected')}`}</EmptyTitle>
            <EmptySubTitle />
        </EmptyView>
    )
}