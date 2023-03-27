import t from 't'
import { useSelector } from 'react-redux'
import { ActivityIndicator } from 'co/native'

import { Wrap, Message } from './empty.style'

export default function CollectionCoverItemsEmpty() {
    const { status } = useSelector(state=>state.covers)

    return (
        <Wrap>
            {status == 'loading' ? (
                <ActivityIndicator />
            ) : (
                <Message>
                    {t.s('nothingFound')}
                </Message>
            )}
        </Wrap>
    )
}