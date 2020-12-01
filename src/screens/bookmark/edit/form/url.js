import t from 't'
import React from 'react'
import { InputURL } from 'co/form'

export default class BookmarkEditURL extends React.PureComponent {
    onChange = (link)=>this.props.onChange({link})

    render() {
        const { link, onChange, onSubmit, ...original } = this.props

        return (
            <InputURL last
                value={link}
                placeholder={t.s('enterLinkDescription')}
                onChangeText={this.onChange}
                onSubmitEditing={onSubmit}
                {...original} />
        )
    }
}