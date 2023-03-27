import t from 't'
import { Component } from 'react';
import Toggle from 'co/form/toggle'

export default class BookmarkEditTagsField extends Component {
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
                variant={important ? 'fill' : undefined}
                onChange={this.onChange}
                label={t.s('favorites')} />
        )
    }
}