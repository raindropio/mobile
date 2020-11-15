import React from 'react'
import { connect } from 'react-redux'
import { load } from 'data/actions/filters'
import { getFilters } from 'data/selectors/filters'

import FlatList from 'co/list/flat/basic'
import { getListViewParams } from 'modules/view'
import size from 'modules/appearance/size'

import Header from './header'
import Filter from 'co/filters/item'

const emptyArray = []

class FiltersItems extends React.PureComponent {
	static defaultProps = {
		style: {}
    }

    listViewParams = getListViewParams(size.height.item)

    componentDidMount() {
        this.props.load('global')
    }

    keyExtractor = ({ _id })=>_id

    renderItem = ({ item: row })=>(
        <Filter 
            {...row} />
    )
    
    render() {
        const { style, filters, hidden } = this.props

        return (
            <FlatList 
                data={hidden ? emptyArray : filters}
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
        filters: getFilters(state, 'global'),
        hidden: state.config.filters_hide
    }),
	{ load }
)(FiltersItems)