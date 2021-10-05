import React from 'react'
import _ from 'lodash-es'
import t from 't'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'
import { Wrap, Control } from './style'

class SearchScreenTabs extends React.Component {
    getValues = ()=>
        [t.s('everywhere'), this.props.title]

    state = {
        values: this.getValues()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.title != this.props.title)
            this.setState({ values: this.getValues() })
    }

    onChange = ({ nativeEvent: { selectedSegmentIndex } })=>
        this.props.setSpaceId(
            selectedSegmentIndex==0 ?
                0 :
                parseInt((this.props.route.params||{}).spaceId)
        )

	render() {
        const { route: { params={} }, spaceId } = this.props

        if (!params.spaceId)
            return null

		return (
            <Wrap>
                <Control
                    selectedIndex={spaceId ? 1 : 0}
                    values={this.state.values}
                    onChange={this.onChange} />
            </Wrap>
        )
	}
}

export default connect(
	() => {
		const getCollection = makeCollection()
	
		return (state, { route: { params={} } })=>({
			title: getCollection(state, params.spaceId).title,
		})
	}
)(SearchScreenTabs)