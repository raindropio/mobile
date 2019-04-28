import React from 'react'
import t from 't'
import Navigation from 'modules/navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tagsActions from 'data/actions/tags'
import { makeTags } from 'data/selectors/tags'

import Form from './form'
import {
	ButtonAction
} from 'co/common/button'

class PickTagsContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {current: []}
	}

	componentDidMount() {
		this.props.actions.tags.load()
	}

	onEditTag = (tagName)=>{
		Navigation.push(this.props, 'screens/tags/edit', { tagName })
	}

	onRemoveTag = (tagName)=>{
		this.props.actions.tags.oneRemove(tagName)
	}

	onChange = (tags)=>this.setState({current: tags})
	onSelect = ()=>this.props.onSelect(this.state.current)

	render() {
		const count = this.state.current.length
		return (
			<Form 
				{...this.props}
				current={this.state.current}
				onEditTag={this.onEditTag}
				onRemoveTag={this.onRemoveTag}
				onChange={this.onChange}>
				{count ? 
					<ButtonAction onPress={this.onSelect}>{t.s('add')} {count} {t.s('tags').toLowerCase()}</ButtonAction>
					: null
				}
			</Form>
		)
	}
}

const makeMapStateToProps = () => {
	const 
		getTags = makeTags()

	const mapStateToProps = (state)=>{
		return {
			other: getTags(state)
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			tags: bindActionCreators(tagsActions, dispatch)
		}
	})
)(PickTagsContainer)