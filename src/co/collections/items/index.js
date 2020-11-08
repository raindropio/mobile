import t from 't'
import React from 'react'
import { PropTypes } from 'prop-types'
import withNavigation from 'co/navigation/withNavigation'

import { Wrap } from './style'
import View from './view'
import SearchBar from 'co/common/searchBar'

class CollectionsItems extends React.PureComponent {
	static propTypes = {
		onItemTap:		PropTypes.func,
		onSystemDrop:	PropTypes.func
	}

	static defaultProps = {
		searchAutoFocus: false,
		options: {}
	}

	state = {
		options: this.props.options,
		showSearch: this.props.showSearch
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

	onItemTap = item=>{
		if (item._id == -100){
			this.props.navigation.navigate('collection', { 
				screen: 'add', 
				params: {
					title: this.state.options.search,
					autoSave: true
				}
			})
			return
		}

		this.props.onItemTap && this.props.onItemTap(item)
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
			<Wrap>
				<View 
					{...this.props}
					onItemTap={this.onItemTap}
					treeProps={this.state}
					SearchComponent={this.renderSearch()} />
			</Wrap>
		)
	}
}

export default withNavigation(CollectionsItems)