import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import t from 't'
import withNavigation from 'co/navigation/withNavigation'

import { Wrap } from './style'
import Field from 'co/common/tokenField'
import List from './list'

class TagsPicker extends React.Component {
    static propTypes = {
		selected:	PropTypes.array,
        suggested:	PropTypes.array,
        onSubmit: 	PropTypes.func,
        onChange:	PropTypes.func
	}

	state = {
		value: '',
		selected: this.props.selected || []
    }
    
    events = {
		onAdd: (name)=>{
			if (name)
				this.setState({
					selected: _.uniq([...this.state.selected, name]),
					value: ''
				}, ()=>
					this.props.onChange && this.props.onChange(this.state.selected)
				)
			else
				this.events.onSubmit()
		},

		onRemove: (removeIndex)=>
			this.setState({selected: this.state.selected.filter((_,i)=>i!=removeIndex)}, ()=>
				this.props.onChange && this.props.onChange(this.state.selected)
			),

		onClear: ()=>
			this.setState({selected: []}, ()=>
				this.props.onChange && this.props.onChange(this.state.selected)
			),

		onValueChange: (value)=>
			this.setState({value}),

		onSubmit: async()=>{
			this.props.onSubmit && await this.props.onSubmit(this.state.selected)
		}
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

export default withNavigation(TagsPicker)