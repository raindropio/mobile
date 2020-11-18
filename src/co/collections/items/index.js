import t from 't'
import React from 'react'
import { PropTypes } from 'prop-types'
import withNavigation from 'co/navigation/withNavigation'

import { Wrap } from './style'
import View from './view'
import SearchBar from 'co/common/searchBar'

class CollectionsItems extends React.PureComponent {
	static propTypes = {
		//customization
		options:			PropTypes.object,
		searchAutoFocus:	PropTypes.bool,
		//+all in ./view
	}

	static defaultProps = {
		searchAutoFocus: false,
		options: {}
	}

	state = {
		options: this.props.options
	}

	//Search
	onSearchCancel = ()=>{
	}

	onSearchChange = (search)=>{
		this.setState({
			options: {
				...this.state.options,
				search
			}
		})
	}

	onItemPress = item=>{
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

		this.props.onItemPress && this.props.onItemPress(item)
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
					onItemPress={this.onItemPress}
					treeProps={this.state}
					SearchComponent={this.props.SearchComponent || this.renderSearch()} />
			</Wrap>
		)
	}
}

export default withNavigation(CollectionsItems)