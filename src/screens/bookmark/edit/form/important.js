import t from 't'
import React from 'react'

import Toggle from 'co/common/toggle'

export default class BookmarkEditTagsField extends React.PureComponent {
    static defaultProps = {
        last:       false,
        important:  false,
        onChange:   null
    }

    onChange = ()=>{
        this.props.onChange({important: !this.props.important})
    }

    render() {
        const { last, important } = this.props

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