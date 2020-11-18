import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { load } from 'data/actions/collections'
import { Wrap, Title } from './style'
import Icon from 'co/collections/item/icon'

class SpaceTitle extends React.Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { text, _id, cover=[], title } = this.props

        if (!text && !title)
            return null
    
        return (
            <Wrap>
                {_id>0 ? (
                    <Icon 
                        collectionId={_id}
                        src={cover[0]}
                        size={24} />
                ) : null}
                    
                <Title
                    numberOfLines={1}
                    margin={_id ? true : false}>
                    {text || title}
                </Title>
            </Wrap>
        )
    }
}

export default connect(
    () => {
        const getCollection = makeCollection()

        return (state, { spaceId })=>{
            return getCollection(state, spaceId)
        }
    },
    { load }
)(SpaceTitle)