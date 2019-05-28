import React from 'react'
import PropTypes from 'prop-types'
import t from 't'
import Navigation from 'modules/navigation'
import TreeContainer from 'co/collections/items'
import buttons from 'co/collections/items/buttons'

class PickCollectionScreen extends React.Component {
	static propTypes = {
		title:				PropTypes.string,
		hideIds:			PropTypes.array,
		groupSelectable:	PropTypes.bool,
		selectedId:			PropTypes.any,
		onSelect:			PropTypes.func
	}

	static options = ({title, subtitle})=>({
		topBar: {
			title: {
				text: title || t.s('selectCollection')
			},
			subtitle: {
				text: subtitle
			},
			...buttons
		}
	})

	constructor(props) {
		super(props)

		this.itemsOptions = {
			hideIds: [0].concat(props.hideIds||[]),
			showGroups: props.groupSelectable
		}
	}

	closeScreen = ()=>{
		if (this.props.onClose)
			return this.props.onClose()

		Navigation.close(this.props)
	}

	onItemTap = (item)=>{
		if (!this.props.onSelect(item._id))
			this.closeScreen()
	}

	onCreateNew = (item)=>{
		Navigation.push(this.props, 'collection/add', {
			...item,
			onSuccess: this.onItemTap
		})
	}

	render() {
		return (
			<TreeContainer 
				{...this.props}
				onClose={this.closeScreen}
				options={this.itemsOptions}
				searchAutoFocus={true}
				onItemTap={this.onItemTap}
				onCreateNew={this.onCreateNew} />
		)
	}
}

export default PickCollectionScreen