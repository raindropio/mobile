import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { status } from 'data/selectors/bookmarks'
import { load } from 'data/actions/bookmarks'

import Bookmarks from 'co/bookmarks/items'
import Suggestions from './suggestions'
import Collections from './collections'

class SearchScreenContent extends React.Component {
    static propTypes = {
        spaceId:    PropTypes.string,
        query:      PropTypes.string
    }
    
    state = {
        searching: false,
        haveSuggestions: false
    }

    componentDidMount() {
        this.handlers.onLoad()
        this.handlers.onLoadBounced = _.debounce(this.handlers.onLoad, 500, { maxWait: 2000 })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.spaceId !== this.props.spaceId)
            this.handlers.onLoad()

        if (prevProps.query !== this.props.query){
            //search when empty query or with space at the end
            if (!this.props.query || 
                this.props.query.endsWith(' '))
                return this.handlers.onLoad()

            //start searching only when no suggestions visible
            if (!this.state.haveSuggestions)
                this.handlers.onLoadBounced()
        }
    }

    handlers = {
        onLoad: ()=>{
            const search = (this.props.query||'').trim()
            
            this.setState({ searching: search?true:false }, ()=>{
                this.props.load(this.props.spaceId, { sort: 'score', search })
            })
        },

        onCollectionPress: spaceId=>
            this.props.navigation.push('browse', { spaceId }),

        onHaveSuggestions: (haveSuggestions)=>{
            if (haveSuggestions != this.state.haveSuggestions)
                this.setState({ haveSuggestions })
        }
    }

    renderMore = ()=>(
        <>
            <Suggestions 
                {...this.props}
                searching={this.state.searching}
                {...this.handlers} />

            <Collections 
                {...this.props}
                {...this.handlers} />
        </>
    )

	render() {
        if (this.state.searching)
            return (
                <Bookmarks 
                    {...this.handlers}
                    key={this.props.spaceId}
                    spaceId={this.props.spaceId}
                    header={()=>this.renderMore()} />
            )

		return this.renderMore()
	}
}

export default connect(
	(state, props)=>{
        const spaceId = props.spaceId+'s'

        return {
            spaceId,
            status: status(state, spaceId).main
        }
    },
	{ load }
)(SearchScreenContent)