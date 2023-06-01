import { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import t from 't'
import withNavigation from 'co/navigation/withNavigation'
import Icon from 'co/icon'

import { Wrap, Tabs, Header, SelectedCount } from './style'
import SearchField from 'co/form/search'
import All from './all'
import Selected from './selected'

const flexOne = { flex: 1 }

class TagsPicker extends Component {
    static propTypes = {
		selected:	PropTypes.array,
		spaceId:	PropTypes.any, //optional
        onSubmit: 	PropTypes.func,
        onChange:	PropTypes.func
	}

	state = {
		value: '',
		tabs: {
			index: this.props.selected.length ? 1 : 0,
			routes: [{key: 'all'}, {key: 'selected'}]
		},
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
			this.props.navigation.navigate('tag', { tagName }),

		onSubmit: ()=>{
			if (!this.state.value)
				this.props.onSubmit()
			else{
				this.events.onAdd(this.state.value)
				this.events.onTabChange(1)
			}
		},

		onTabChange: (index)=>
			this.setState({
				value: index==1 ? '' : this.state.value,
				tabs: { ...this.state.tabs, index }
			})
	}

	componentDidUpdate(prevProps, prevState) {
		let goToAll = false

		//open all tabs when searchin
		if (prevState.value != this.state.value)
			if (this.state.value && this.state.tabs.index)
				goToAll = true

		//removed all selected, so open all
		if (prevProps.selected != this.props.selected)
			if (!this.props.selected.length)
				goToAll = true

		if (goToAll)
			this.events.onTabChange(0)
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
	
	onShowSelectedPress = ()=>
		this.events.onTabChange(1)

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
					<SearchField 
						{...this.state}
						{...this.field}
						style={flexOne}
						autoFocus
						blurOnSubmit={false}
						placeholder={t.s('addTag')+'...'}
						returnKeyType='send'
						returnKeyLabel={t.s('add')} />

					{!!(this.props.selected.length && !this.state.tabs.index) && (
						<SelectedCount.Tap onPress={this.onShowSelectedPress}>
							<SelectedCount.Text>
								{this.props.selected.length}
							</SelectedCount.Text>

							<Icon 
								name='arrow-drop-right'
								color='background.regular' />
						</SelectedCount.Tap>
					)}
				</Header>

				<Tabs 
					lazy
					swipeEnabled={false}
					navigationState={this.state.tabs}
					onIndexChange={this.events.onTabChange}
					renderScene={this.renderContent} />
			</Wrap>
		)
	}
}

export default withNavigation(TagsPicker)