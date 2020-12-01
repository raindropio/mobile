import t from 't'
import React from 'react'
import Toggle from 'co/form/toggle'

export default class BookmarkEditTagsField extends React.Component {
    static defaultProps = {
        last:       false,
        important:  false,
        onChange:   null
    }

    onChange = ()=>
        this.props.onChange({important: !this.props.item.important})

    render() {
        const { last, item: { important } } = this.props

        return (
            <Toggle 
                last={last}
                value={important}
                icon='heart-3'
                color={important ? 'important' : undefined}
                variant={important ? 'fill' : 'line'}
                onChange={this.onChange}
                label={t.s('favorites')} />
        )
    }
}