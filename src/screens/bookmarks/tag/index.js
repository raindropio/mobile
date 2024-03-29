import { Component } from 'react';
import t from 't'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { appendTagsSelected } from 'data/actions/bookmarks'
import { makeSelectMode } from 'data/selectors/bookmarks'

import TagPicker from 'co/tags/picker'
import Header from 'co/navigation/header'

class BookmarksTagSelected extends Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				spaceId: PropTypes.number
			})
		})
	}

	static options = {
		title: t.s('tags')
	}

	state = {
		selected: []
	}

	onChange = (selected)=>
		this.setState({ selected })

	onSubmit = ()=>{
        this.props.appendTagsSelected(this.props.route.params.spaceId, this.state.selected)
		this.props.navigation.goBack()
	}

	render() {
		const { navigation } = this.props
		const { selected } = this.state
		const count = selected.length

		return (
			<>
				<Header.Buttons a>
					<Header.Cancel onPress={navigation.goBack} />
				</Header.Buttons>

				<Header.Buttons count={count}>
					<Header.Button 
						title={t.s('add')}
						bold
						disabled={!count}
						onPress={this.onSubmit} />
				</Header.Buttons>

				<TagPicker
					selected={selected}
					onChange={this.onChange}
					onSubmit={this.onSubmit} />
			</>
		)
	}
}

export default connect(
	() => {
		const getSelectMode = makeSelectMode()
	
		return (state, { route: { params={} } })=>
			getSelectMode(state, params.spaceId)
	},
	{ appendTagsSelected }
)(BookmarksTagSelected)