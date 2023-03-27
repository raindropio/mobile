import { Component } from 'react';
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { load } from 'data/actions/collections'
import { Wrap, Title } from './style'
import Icon from 'co/collections/item/icon'

class SpaceTitle extends Component {
    componentDidMount() {
        this.props.load()
    }

    render() {
        const { text, _id, cover=[], title } = this.props

        if (!text && !title)
            return null
    
        return (
            <Wrap>
                {_id ? (
                    <Icon 
                        collectionId={_id}
                        src={cover[0]}
                        size={24} />
                ) : null}
                    
                <Title numberOfLines={1}>
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