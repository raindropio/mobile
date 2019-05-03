import React from 'react'

export default class ImageType extends React.PureComponent {
    componentDidMount() {
        this.props.onNew()
    }

    render() {
        return null
    }
}