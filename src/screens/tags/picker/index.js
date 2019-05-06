import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import Navigation from 'modules/navigation'
import loadingButton from 'co/screen/buttons/loading'
import doneButton from 'co/screen/buttons/done'
import _ from 'lodash'

import { Wrap } from './style'
import Field from 'co/common/tokenField'
import List from './list'

export default class TagsPickerScreen extends React.Component {
	state = {
		value: '',
		selected: this.props.selected || []
	}
	
	static propTypes = {
		selected:	PropTypes.array,
		suggested:	PropTypes.array,
		onSubmit: 	PropTypes.func,
		onChange:	PropTypes.func
	}

	static options(props={}) {
		return {
			//style: 'form',
			
			topBar: {
				title: {
					text: props.title || t.s('tags')
				},
				...doneButton
			}
		}
	}

	_navigationEvents = Navigation.events().bindComponent(this)

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

	events = {
		onAdd: (name)=>
			this.setState({
				selected: _.uniq([...this.state.selected, name]),
				value: (this.state.value == name ? '' : this.state.value)
			}, ()=>
				this.props.onChange && this.props.onChange(this.state.selected)
			),

		onRemove: (name)=>
			this.setState({selected: this.state.selected.filter(current=>current!=name)}, ()=>
				this.props.onChange && this.props.onChange(this.state.selected)
			),

		onClear: ()=>
			this.setState({selected: []}, ()=>
				this.props.onChange && this.props.onChange(this.state.selected)
			),

		onValueChange: (value)=>
			this.setState({value})
	}

	render() {
		return (
			<Wrap>
				<Field 
					{...this.state}
					placeholder={t.s('addTags')+'...'}
					events={this.events} />
				
				<List 
					{...this.props}
					{...this.state}
					events={this.events} />
			</Wrap>
		)
	}
}