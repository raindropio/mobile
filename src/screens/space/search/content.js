import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStatus, getSearchEmpty } from 'data/selectors/bookmarks'
import { load } from 'data/actions/bookmarks'

import Bookmarks from 'co/bookmarks/items'
import Suggestions from './suggestions'

class SearchScreenContent extends React.Component {
    static propTypes = {
        spaceId:    PropTypes.string,
        query:      PropTypes.string
    }
    
    state = {
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
        onLoad: ()=>
            this.props.load(this.props.spaceId, { sort: 'score', search: (this.props.query||'').trim() }),

        onCollectionPress: spaceId=>
            this.props.navigation.push('browse', { spaceId }),

        onHaveSuggestions: (haveSuggestions)=>{
            if (haveSuggestions != this.state.haveSuggestions)
                this.setState({ haveSuggestions })
        }
    }

    onMoreTap = ()=>
        this.props.navigation.navigate('collection', { screen: 'menu', params: { _id: this.props.spaceId } })

    renderSuggestions = ()=>(
        <Suggestions 
            {...this.props}
            {...this.handlers} />
    )

	render() {
        if (this.props.searching)
            return (
                <Bookmarks 
                    {...this.handlers}
                    key={this.props.spaceId}
                    spaceId={this.props.spaceId}
                    header={()=>this.renderSuggestions()} />
            )

		return this.renderSuggestions()
	}
}

export default connect(
	() => {
        const getStatus = makeStatus()
    
        return (state, props)=>{
            const spaceId = props.spaceId+'s'

            return {
                spaceId,
                status: getStatus(state, spaceId).main,
                searching: !getSearchEmpty(state, spaceId)
            }
        }
    },
	{ load }
)(SearchScreenContent)