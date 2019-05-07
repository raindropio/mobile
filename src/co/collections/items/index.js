import t from 't'
import React from 'react'
import { SafeAreaView } from 'react-native'
import Navigation from 'modules/navigation'

import View from './view'
import SearchBar from 'co/common/searchBar'

const flexOne = {flex: 1}

export default class CollectionsItems extends React.PureComponent {
	static defaultProps = {
		searchAutoFocus: false,
		options: {}
	}

	constructor(props) {
		super(props)

		this.state = {
			options: props.options,
			showSearch: props.showSearch
		}

		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'add':
				this.onAdd()
			break;

			case 'search':
				this.setState({showSearch: true})
			break;

			case 'cancel':
				typeof this.props.onClose == 'function' && this.props.onClose()
			break;
		}
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	onAdd = (parentId)=>{
		Navigation.showModal(this.props, 'collection/add', {
			parentId,
			title: this.state.options.search,
			onSuccess: this.props.onItemTap
		})
	}

	//Search
	onSearchCancel = ()=>{
		this.setState({showSearch: false})
	}

	onSearchChange = (search)=>{
		this.setState({
			options: {
				...this.state.options,
				search
			}
		})
	}

	renderSearch = ()=>(
		<SearchBar 
			value={this.state.options.search}
			placeholder={t.s('findCollection')}
			autoFocus={!this.props.selectedId && this.props.searchAutoFocus}

			onChange={this.onSearchChange}
			onCancel={this.onSearchCancel} />
	)

	render() {
		return (
			<SafeAreaView style={flexOne}>
				<View 
					{...this.props}
					options={this.state.options}
					SearchComponent={this.renderSearch()}
					onAdd={this.onAdd} />
			</SafeAreaView>
		)
	}
}