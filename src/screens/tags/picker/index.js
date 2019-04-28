import React from 'react'
import t from 't'
import Navigation from 'modules/navigation'
import loadingButton from 'co/screen/buttons/loading'
import doneButton from 'co/screen/buttons/done'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tagsActions from 'data/actions/tags'
import { makeTags } from 'data/selectors/tags'

import { Wrap } from './style'
import Field from './field'
import List from './list'

class TagsPickerScreen extends React.Component {
	state = {
		selected: this.props.selected || [],
		suggested: [],

		onSubmit: null,
		onChange: null
	}
	
	static options() {
		return {
			style: 'form',
			
			topBar: {
				title: {
					text: t.s('tags')
				},
				...doneButton
			}
		}
	}

	_navigationEvents = Navigation.events().bindComponent(this)

	componentDidMount() {
		this.props.actions.tags.load()
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	async navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'done':
				Navigation.mergeOptions(this.props, {
					topBar: loadingButton
				})
				this.props.onSubmit && await this.props.onSubmit(this.state.selected)
				Navigation.close(this.props)
			break;
		}
	}

	onSelectedChange = (selected)=>{
		this.setState({selected: _.uniq(selected)}, ()=>
			this.props.onChange && this.props.onChange(this.state.selected)
		)
	}

	render() {
		return (
			<Wrap>
				<Field 
					items={this.state.selected}
					onChange={this.onSelectedChange} />

				<List 
					items={this.props.other} />
			</Wrap>
		)
	}
}

export default connect(
	() => {
		const getTags = makeTags()
	
		return (state)=>({
			other: getTags(state)
		})
	},
	(dispatch)=>({
		actions: {
			tags: bindActionCreators(tagsActions, dispatch)
		}
	})
)(TagsPickerScreen)