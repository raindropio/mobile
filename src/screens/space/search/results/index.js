import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { status, getSearchEmpty } from 'data/selectors/bookmarks'
import { load } from 'data/actions/bookmarks'

import Bookmarks from 'co/bookmarks/items'
import Collections from './collections'

class SearchScreenResults extends React.Component {
    static propTypes = {
        spaceId:    PropTypes.string,
        query:      PropTypes.string
    }

    componentDidMount() {
        this.handlers.onLoad()
        this.handlers.onLoadBounced = _.debounce(this.handlers.onLoad, 500, { maxWait: 2000 })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.spaceId !== this.props.spaceId ||
            prevProps.submitKey !== this.props.submitKey)
            this.handlers.onLoad()
    }

    handlers = {
        onLoad: ()=>
            this.props.load(this.props.spaceId, { sort: 'score', search: (this.props.query||'').trim() }),

        onCollectionPress: spaceId=>
            this.props.navigation.push('browse', { spaceId })
    }

    renderCollections = ()=>(
        <Collections 
            {...this.props}
            {...this.handlers} />
    )

	render() {
        if (!this.props.query)
            return null

        if (this.props.searching)
            return (
                <Bookmarks 
                    {...this.handlers}
                    key={this.props.spaceId}
                    spaceId={this.props.spaceId}
                    header={()=>this.renderCollections()} />
            )

		return (
            <View style={{flex:1}}>
                {this.renderCollections()}
            </View>
        )
	}
}

export default connect(
	(state, props)=>{
        const spaceId = props.spaceId+'s'

        return {
            spaceId,
            status: status(state, spaceId).main,
            searching: !getSearchEmpty(state, spaceId)
        }
    },
	{ load }
)(SearchScreenResults)