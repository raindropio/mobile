import { useCallback } from 'react';
import t from 't'
import { connect } from 'react-redux'
import { oneRecover } from 'data/actions/bookmarks'

import { Form } from 'co/form'
import { Warning } from 'co/alert'
import Button from 'co/button'

function IndicatorRemoved({ item: { _id, collectionId }, oneRecover }) {
    if (collectionId != -99)
        return null

    const onPress = useCallback(()=>{
        oneRecover(_id)
    }, [_id])

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

export default connect(
	undefined,
	{ oneRecover }
)(IndicatorRemoved)