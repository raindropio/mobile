import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { oneUpload } from 'data/actions/bookmarks'

class CreateURL extends React.Component {
    state = {
        items: [],
        status: 'loading'
    }

    async componentDidMount() {
        const { values, collectionId, oneUpload } = this.props

        let items = []

        //upload in parallel
        for (const chunk of _.chunk(values, 5))
            items.push(
                ...await Promise.all(
                    chunk.map(file=>
                        new Promise((res,rej)=>{
                            oneUpload({
                                collectionId,
                                file
                            }, res, rej)
                        })
                    )
                )
            )

        this.setState({
            items,
            status: 'loaded'
        })
    }

    render() {
        const { children } = this.props
        const { items, status } = this.state
        
        return children(items, status)
    }
}

export default connect(
    undefined,
    { oneUpload }
)(CreateURL)