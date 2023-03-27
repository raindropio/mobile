import { Component } from 'react';
import _ from 'lodash'
import t from 't'
import { connect } from 'react-redux'
import { makeViewHide } from 'data/selectors/bookmarks'
import { makeCollection } from 'data/selectors/collections'
import { viewToggle, setListCoverRight } from 'data/actions/bookmarks'

import { Form, FormSection } from 'co/form'
import { SectionText } from 'co/style/section'
import Toggle from 'co/form/toggle'

class BookmarksHeaderViewShow extends Component {
    onToggle = (field)=>{
        this.props.viewToggle(this.props._id, field)
    }

    onSetListCoverRight = ()=>{
        this.props.setListCoverRight(this.props._id, !this.props.listCoverRight)
    }

    render() {
        const { viewHide=[], view, listCoverRight } = this.props

        const options = [
            ['cover', t.s(view == 'simple' ? 'icon' : 'cover')],
            ['title', t.s('title')],
            ['excerpt', t.s('description')],
            ['highlights', t.s('highlights')],
            ['tags', t.s('tags')],
            ['info', _.capitalize(t.s('bookmarks')) + ' ' + t.s('info').toLowerCase()]
        ]

        return (
            <>
                <FormSection><SectionText>{t.s('show')} {t.s('in')} {t.s('view_'+view).toLowerCase()}</SectionText></FormSection>
                
                <Form>
                    {options.map(([key, title])=>
                        <Toggle 
                            key={key}
                            value={!viewHide.includes(key)}
                            label={title}
                            onChange={()=>this.onToggle(key)} />
                    )}
                </Form>

                {/*view == 'list' && !viewHide.includes('cover') ? (
                    <Form>
                        <Toggle 
                            checked={listCoverRight}
                            label={t.s('cover') + ' ' + t.s('position') + ' ' + t.s('right')}
                            onChange={this.onSetListCoverRight} />
                    </Form>
                ) : null*/}
            </>
        )
    }
}

export default connect(
	() => {
        const getViewHide = makeViewHide()
        const getCollection = makeCollection()

        return (state, { _id })=>({
            view: getCollection(state, _id).view,
            viewHide: getViewHide(state, _id),
            listCoverRight: state.config.raindrops_list_cover_right
        })
    },
	{ viewToggle, setListCoverRight }
)(BookmarksHeaderViewShow)