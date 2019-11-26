import React from 'react'
import t from 't'

export default class FileType extends React.PureComponent {
    componentDidMount() {
        this.props.onNew(t.s('add')+' '+t.s('file').toLowerCase())
    }

    render() {
        return null
    }
}