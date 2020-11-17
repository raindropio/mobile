import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import t from 't'
import withNavigation from 'co/navigation/withNavigation'
import Icon from 'co/icon'

import { Wrap, Tabs, Header, SelectedCount } from './style'
import SearchField from 'co/common/searchBar'
import All from './all'
import Selected from './selected'

const flexOne = { flex: 1 }

class TagsPicker extends React.Component {
    static propTypes = {
		selected:	PropTypes.array,
		spaceId:	PropTypes.any, //optional
        suggested:	PropTypes.array,
        onSubmit: 	PropTypes.func,
        onChange:	PropTypes.func
	}

	state = {
		value: '',
		tabs: {
			index: this.props.selected.length ? 0 : 1,
			routes: [{key: 'selected'}, {key: 'all'}]
		},
    }
    
    events = {
		onAdd: (name)=>{
			this.props.onChange(_.uniq([...this.props.selected, name]))
			this.field.onChange('')
		},

		onRemove: (name)=>
			this.props.onChange(_.without(this.props.selected, name)),

		onToggle: (name)=>
			this.props.selected.includes(name) ? this.events.onRemove(name) : this.events.onAdd(name),

		onEdit: (tagName)=>
			this.props.navigation.navigate('tag', { tagName }),

		onTabChange: (index)=>
			this.setState({
				value: index==0 ? '' : this.state.value,
				tabs: { ...this.state.tabs, index }
			})
	}

	componentDidUpdate(prevProps, prevState) {
		let goToAll = false

		//open all tabs when searchin
		if (prevState.value != this.state.value)
			if (this.state.value && !this.state.tabs.index)
				goToAll = true

		//removed all selected, so open all
		if (prevProps.selected != this.props.selected)
			if (!this.props.selected.length)
				goToAll = true

		if (goToAll)
			this.events.onTabChange(1)
	}
	
	field = {
		onChange: (value)=>
			this.setState({ value }),

		onSubmit: ()=>{
			if (!this.state.value)
				this.props.onSubmit()
			else{
				this.events.onAdd(this.state.value)
				this.events.onTabChange(0)
			}
		}
	}
	
	onShowSelectedPress = ()=>
		this.events.onTabChange(0)

	renderContent = ({ route: { key } })=>{
		switch(key) {
			case 'selected':
				return <Selected {...this.props} {...this.events} />

			case 'all':
				return <All {...this.props} {...this.events} {...this.state} />
		}
	}
    
    render() {
		return (
			<Wrap>
				<Header>
					{!!(this.props.selected.length && this.state.tabs.index) && (
						<SelectedCount.Tap onPress={this.onShowSelectedPress}>
							<Icon 
								name='menu-fold'
								color={this.state.tabs.index!=0 ? 'background.regular' : 'text.secondary'} />

							<SelectedCount.Text>
								{this.props.selected.length}
							</SelectedCount.Text>
						</SelectedCount.Tap>
					)}

					<SearchField 
						{...this.state}
						{...this.field}
						style={flexOne}
						autoFocus
						placeholder={t.s('addTag')+'...'}
						returnKeyLabel={t.s('add')} />
				</Header>

				<Tabs 
					lazy
					swipeEnabled={this.props.selected.length ? true : false}
					navigationState={this.state.tabs}
					onIndexChange={this.events.onTabChange}
					renderScene={this.renderContent} />
			</Wrap>
		)
	}
}

export default withNavigation(TagsPicker)