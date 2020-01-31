import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import _ from 'lodash-es'
import { connect } from 'react-redux'
import { makeCollectionPath } from 'data/selectors/collections'

import Icon from 'co/common/icon'
import Goto from 'co/common/goto'

class EditBookmarkPath extends React.Component {
    static defaultProps = {
        last:       false,
        collectionId: 0,
        onChange:   null
    }

    onPress = ()=>{
        Navigation.push(this.props, 'collections/picker', {
			selectedId: this.props.collectionId,
			onSelect: (collectionId)=>{
				this.props.onChange({ collectionId })
			}
		})
    }

    render() {
        const {
            last,
            path
        } = this.props

        if (!path.length)
            return null;

        const pathText = path.map((p)=>p.title).join(' / ')
        const { _id, cover=[], title, color } = path[path.length-1]
        
        return (
            <Goto 
                last={last}
                onPress={this.onPress}
                iconComponent={<Icon collectionId={_id} src={cover[0]} title={title} color={color} size='list' />}
                label={pathText} />
        )
    }
}

export default connect(
	() => {
        const getCollectionPath = makeCollectionPath()
        const options = { self: true }
            
        const mapStateToProps = (state, { collectionId })=>{
            return {
                path: getCollectionPath(state, collectionId, options)
            }
        }
    
        return mapStateToProps
    },
	undefined
)(EditBookmarkPath)