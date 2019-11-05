import React from 'react'
import Navigation from 'modules/navigation'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { Tap, Wrap, Title, ArrowIcon, CollaboratorsIcon } from './style'
import Icon from 'co/common/icon'

class SpaceTitle extends React.PureComponent {
    onPress = ()=>{
        Navigation.showModal(
            this.props, 
            this.props._id > 0 ? 'collection/edit' : 'collection/system', 
            { _id: this.props._id, title: this.props.title, color: this.props.color, viewMode: true }
        )
    }

    render() {
        const { text, _id, cover=[], title, color, collaborators } = this.props

        if (!text && !title)
            return null

        return (
            <Tap onPress={this.onPress}>
                <Wrap>
                    {_id>0 ? (<Icon 
                        collectionId={_id}
                        src={cover[0]}
                        title={title}
                        color={color}
                        size='list' />) : null}
                        
                    <Title
                        numberOfLines={1}
                        margin={_id ? true : false}>
                        {text || title}
                    </Title>
                    
                    {collaborators && <CollaboratorsIcon />}
                    <ArrowIcon />
                </Wrap>
            </Tap>
        )
    }
}

export default connect(
    _ => {
        const getCollection = makeCollection()
    
        const mapStateToProps = (state, {spaceId})=>{
            const { _id, title, cover, color, collaborators } = getCollection(state, spaceId)

            return {
                _id, title, cover, color, collaborators
            }
        }
    
        return mapStateToProps
    },
	(dispatch)=>({})
)(SpaceTitle)