import React from 'react'
import { connect } from 'react-redux'
import { load } from 'data/actions/filters'
import { getTags } from 'data/selectors/tags'

import FlatList from 'co/list/flat/basic'
import { getListViewParams } from 'modules/view'
import size from 'modules/appearance/size'

import Header from './header'
import Tag from 'co/tags/item'

const emptyArray = []

class TagsItems extends React.PureComponent {
	static defaultProps = {
		style: {}
    }

    listViewParams = getListViewParams(size.height.item)

    componentDidMount() {
        this.props.load('global')
    }

    keyExtractor = ({ _id })=>_id

    renderItem = ({ item: row })=>(
        <Tag 
            {...row} />
    )
    
    render() {
        const { style, tags, hidden } = this.props

        return (
            <FlatList 
                data={hidden ? emptyArray : tags}
                keyExtractor={this.keyExtractor}

                getItemLayout={this.getItemLayout}
                style={style}
                
                renderItem={this.renderItem}
                ListHeaderComponent={Header} />
        )
    }
}

export default connect(
	(state) => ({
        tags: getTags(state, 'global'),
        hidden: state.config.tags_hide
    }),
	{ load }
)(TagsItems)