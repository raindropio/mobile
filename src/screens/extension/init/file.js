import React from 'react'

export default class FileType extends React.PureComponent {
    componentDidMount() {
        this.props.onNew()
    }

    render() {
        return null
    }
}