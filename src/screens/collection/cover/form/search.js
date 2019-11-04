import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import _ from 'lodash'
import SearchBar from 'co/common/searchBar'

export default class PickIcon extends React.PureComponent {
    state = {
        placeholder: `${t.s('defaultCollection-0')} ${t.s('icon').toLowerCase()}...`,
        value: this.props.query
    }

    onChange = (value='')=>{
        this.setState({value}, this.onSubmit)
    }

    onSubmit = _.debounce(()=>{
        this.props.load(this.state.value)
    }, 500)

    render() {
        return (
            <SearchBar 
                autoFocus
                selectTextOnFocus={true}
                {...this.state}
                onChange={this.onChange}
                onCancel={this.onChange}
                onSubmit={this.onSubmit} />
        )
    }
}