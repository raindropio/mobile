import t from 't'
import {
	EmptyView,
	EmptyTitle,
    EmptySubTitle,
	EmptyImageIcon
} from 'co/style/empty'

export default function SpaceSearchMenuEmpty() {
    return (
        <EmptyView>
            <EmptyImageIcon 
                name='search' 
                size='48' />
                
            <EmptyTitle>{t.s('defaultCollection-0')}</EmptyTitle>
            <EmptySubTitle>{t.s('searchD')}</EmptySubTitle>
        </EmptyView>
    )
}