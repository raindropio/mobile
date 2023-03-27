import { useCallback } from 'react';
import { connect } from 'react-redux'
import { draftChange } from 'data/actions/bookmarks'

import { Form } from 'co/form'
import { TitleCover } from './index.style'
import Title from './title'
import Note from './note'
import Cover from './cover'
import Path from './path'
import Tags from './tags'
import Highlights from './highlights'
import Important from './important'
import URL from './url'

function BookmarkEditItem({ draftChange, ...etc }) {
    const onChange = useCallback(obj => {
        draftChange(etc._id, obj)
    }, [ etc._id ])

    return (
        <>
            <Form>
                <TitleCover>
                    <Title {...etc} onChange={onChange} />
                    <Cover {...etc} onChange={onChange} />
                </TitleCover>
                <Note {...etc} onChange={onChange} />
            </Form>

            <Form>
                <Path {...etc} onChange={onChange} />
                <Tags {...etc} onChange={onChange} />
                <Highlights {...etc} />
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