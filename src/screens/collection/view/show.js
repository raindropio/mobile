import { useMemo } from 'react'
import _ from 'lodash'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { makeViewHide } from 'data/selectors/bookmarks'
import { makeCollection } from 'data/selectors/collections'
import { viewToggle, setListCoverRight } from 'data/actions/bookmarks'

import { Form, FormSection } from 'co/form'
import { SectionText } from 'co/style/section'
import Toggle from 'co/form/toggle'

export default function BookmarksHeaderViewShow({ _id }) {
    const dispatch = useDispatch()

    const getViewHide = useMemo(()=>makeViewHide(), [])
    const getCollection = useMemo(()=>makeCollection(), [])

    const view = useSelector(state=>getCollection(state, _id).view)
    const viewHide = useSelector(state=>getViewHide(state, _id))
    const listCoverRight = useSelector(state=>state.config.raindrops_list_cover_right)

    const onToggle = field=>
        dispatch(viewToggle(_id, field))

    const onSetListCoverRight = ()=>
        dispatch(setListCoverRight(_id, !listCoverRight))

    const options = [
        ['cover', t.s(view == 'simple' ? 'icon' : 'cover')],
        ['title', t.s('title')],
        ['note', t.s('note')],
        ['excerpt', t.s('description')],
        ['highlights', t.s('highlights')],
        ['tags', t.s('tags')],
        ['info', _.capitalize(t.s('bookmarks')) + ' ' + t.s('info').toLowerCase()]
    ]

    return (
        <>
            <FormSection><SectionText>{t.format('showInView', t.s('view_'+view).toLowerCase())}</SectionText></FormSection>
            
            <Form>
                {options.map(([key, title])=>
                    <Toggle 
                        key={key}
                        value={!viewHide.includes(key)}
                        label={title}
                        onChange={()=>onToggle(key)} />
                )}
            </Form>

            {/*view == 'list' && !viewHide.includes('cover') ? (
                <Form>
                    <Toggle 
                        checked={listCoverRight}
                        label={t.s('cover') + ' ' + t.s('position') + ' ' + t.s('right')}
                        onChange={onSetListCoverRight} />
                </Form>
            ) : null*/}
        </>
    )
}