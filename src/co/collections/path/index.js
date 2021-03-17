import React from 'react'
import { connect } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'
import { refresh } from 'data/actions/collections'

import Icon from 'co/collections/item/icon'
import Goto from 'co/goto'

class CollectionPath extends React.Component {
    static defaultProps = {
        _id:    0
    }

    componentDidMount() {
        this.props.refresh()
    }

    render() {
        const { path, ...etc } = this.props

        if (!path.length)
            return null;

        const pathText = path.map((p)=>p.title).join(' / ')
        const { _id, cover=[] } = path[path.length-1]
        
        return (
            <Goto 
                {...etc}
                icon={<Icon collectionId={_id} src={cover[0]} color='accent' />}
                label={pathText} />
        )
    }
}

export default connect(
	() => {
        const getCollectionPath = makeCollectionPath()
        const options = { self: true }
            
        return (state, { _id })=>({
            path: getCollectionPath(state, _id, options)
        })
    },
	{ refresh }
)(CollectionPath)