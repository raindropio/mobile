import t from 't'
import React from 'react'
import { PropTypes } from 'prop-types'
import { SafeAreaView } from 'react-native'
import Navigation from 'modules/navigation'

import View from './view'
import SearchBar from 'co/common/searchBar'

const flexOne = {flex: 1}

export default class CollectionsItems extends React.PureComponent {
	static propTypes = {
		onItemTap:		PropTypes.func,
		onCreateNew:	PropTypes.func,
		onSystemDrop:	PropTypes.func
	}

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
				this.props.onCreateNew({
					title: this.state.options.search
				})
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
					SearchComponent={this.renderSearch()} />
			</SafeAreaView>
		)
	}
}