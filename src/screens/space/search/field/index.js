import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import Search from 'co/common/searchBar'
import { Title } from 'co/navigation/header'
import Suggestions from './suggestions'

const placeholder = `${t.s('bookmark')}, ${t.s('collection').toLowerCase()} ${t.s('or')} ${t.s('tag')}…`

export default class SearchField extends React.Component {
    onChange = value=>{
        let submit = false

        if (!value)
            submit = true

        this.props.setQuery(value, submit)
    }

    onSubmit = () =>
        this.props.setQuery(this.props.query)

    render() {
        const { query } = this.props

        return (
            <>
                <Title a={1}>
                    <Search
                        autoFocus
                        value={query}
                        variant={Platform.OS=='ios' ? 'default' : 'head'}
                        placeholder={placeholder}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit} />
                </Title>

                <Suggestions 
                    {...this.props}
                    {...this.state} />
            </>
        )
    }
}