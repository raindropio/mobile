import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { Wrap, Title } from './style'
import Icon from 'co/common/icon'

function SpaceTitle({ text, _id, cover=[], title }) {
    if (!text && !title)
        return null

    return (
        <Wrap>
            {_id>0 ? (<Icon 
                collectionId={_id}
                src={cover[0]}
                size='list' />) : null}
                
            <Title
                numberOfLines={1}
                margin={_id ? true : false}>
                {text || title}
            </Title>
        </Wrap>
    )
}

export default connect(
    () => {
        const getCollection = makeCollection()

        return (state, { spaceId })=>{
            return getCollection(state, spaceId)
        }
    }
)(SpaceTitle)