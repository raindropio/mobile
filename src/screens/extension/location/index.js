import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { connect } from 'react-redux'
import { setExtensionCollectionsSearchFocus } from 'local/actions'

import Header from 'co/navigation/header'
import TreeContainer from 'co/collections/items'

class ExtensionLocation extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
                type:			PropTypes.string,
				values:			PropTypes.array
			})
		})
	}

	static options = {
		title: t.s('newBookmark'),
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0
		}
	}
	
	state = {
		searchAutoFocus: this.props.searchAutoFocus
	}

	treeOptions = {
        hideIds: [0, -99]
    }

	onItemPress = ({ _id })=>{
		const { navigation, route: { params={} } } = this.props

		navigation.replace('create', {
			...params,
			collectionId: _id
		})
	}

	onSearchFocus = ()=>
		this.props.setExtensionCollectionsSearchFocus(true)

	onSearchBlur = ()=>
		this.props.setExtensionCollectionsSearchFocus(false)

	render() {
		return (
			<>
				<Header.Buttons left>
					<Header.Cancel onPress={this.props.navigation.goBack} />
				</Header.Buttons>
				<Header.Buttons />

				<TreeContainer 
					options={this.treeOptions}
					searchAutoFocus={this.state.searchAutoFocus}
					onItemPress={this.onItemPress}
					onSearchFocus={this.onSearchFocus}
					onSearchBlur={this.onSearchBlur} />
			</>
		)
	}
}

export default connect(
	state => ({
		searchAutoFocus: state.local.collectionSearchFocus
	}),
	{ setExtensionCollectionsSearchFocus }
)(ExtensionLocation)