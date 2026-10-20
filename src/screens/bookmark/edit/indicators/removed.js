import t from 't'
import { useDispatch } from 'react-redux'
import { oneRecover } from 'data/actions/bookmarks'

import { Form } from 'co/form'
import { Warning } from 'co/alert'
import Button from 'co/button'

export default function IndicatorRemoved({ item: { _id, collectionId } }) {
    const dispatch = useDispatch()

    if (collectionId != -99)
        return null

    const onPress = ()=>
        dispatch(oneRecover(_id))

    return (
        <Form>
            <Warning 
                icon='delete-bin'
                message={t.s('removeSuccess')}>
                <Button 
                    color='blue'
                    title={t.s('restore')}
                    onPress={onPress} />
            </Warning>
        </Form>
    )
}