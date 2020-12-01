import React from 'react'
import { connect } from 'react-redux'
import { draftChange } from 'data/actions/bookmarks'

import { Form } from 'co/form'
import Text from './text'
import Cover from './cover'
import Path from './path'
import Tags from './tags'
import Important from './important'
import URL from './url'

function BookmarkEditItem({ draftChange, ...etc }) {
    const onChange = React.useCallback(obj => {
        draftChange(etc.item._id, obj)
    }, [ etc.item._id ])

    return (
        <>
            <Form horizontal>
                <Text {...etc} onChange={onChange} />
                <Cover {...etc} onChange={onChange} />
            </Form>

            <Form>
                <Path {...etc} onChange={onChange} />
                <Tags {...etc} onChange={onChange} />
                <URL {...etc} onChange={onChange} />
                <Important {...etc} onChange={onChange} last />
            </Form>
        </>
    )
}

export default connect(
	undefined,
	{ draftChange }
)(BookmarkEditItem)