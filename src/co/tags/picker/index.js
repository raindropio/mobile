import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import t from 't'
import withNavigation from 'co/navigation/withNavigation'

import { Wrap, Header } from './style'
import SearchField from 'co/form/search'
import All from './all'

const flexOne = { flex: 1 }

class TagsPicker extends Component {
    static propTypes = {
		selected:	PropTypes.array,
		spaceId:	PropTypes.any, //optional
        onSubmit: 	PropTypes.func,
        onChange:	PropTypes.func
	}

	state = {
		value: ''
    }
    
    events = {
		onAdd: (name)=>{
			this.props.onChange(_.uniq([
				...this.props.selected, 
				...name.split(',').map(t=>t.trim()).filter(t=>t)
			]))
			this.field.onChange('')
		},

		onRemove: (name)=>
			this.props.onChange(_.without(this.props.selected, name)),

		onToggle: (name)=>
			this.props.selected.includes(name) ? this.events.onRemove(name) : this.events.onAdd(name),

		onEdit: (tagName)=>
			this.props.navigation.navigate('tag/edit', { tagName }),

		onSubmit: ()=>{
			if (!this.state.value)
				this.props.onSubmit()
			else{
				this.events.onAdd(this.state.value)
				this.events.onTabChange(1)
			}
		}
	}
	
	field = {
		onChange: (value)=>{
			if (value.includes(',')){
				this.events.onAdd(value)
				this.events.onTabChange(1)
				return
			}

			this.setState({ value })
		},
		onSubmit: this.events.onSubmit
	}

    render() {
		return (
			<Wrap>
				<Header>
					<SearchField 
						{...this.state}
						{...this.field}
						style={flexOne}
						autoFocus
						blurOnSubmit={false}
						placeholder={t.s('addTag')+'...'}
						returnKeyType='send'
						returnKeyLabel={t.s('add')} />
				</Header>

				<All {...this.props} {...this.events} {...this.state} />
			</Wrap>
		)
	}
}

export default withNavigation(TagsPicker)