import React from 'react'
import PropTypes from 'prop-types'
import Goto from 'co/common/goto'

export default class Tag extends React.PureComponent {
	static propTypes = {
		name: PropTypes.string,
		count: PropTypes.number,

		onItemTap: PropTypes.func, //on tap on tag
		onRemoveTag: PropTypes.func, //on remove tag
		onEditTag: PropTypes.func, //on edit tag
	}

	constructor(props) {
		super(props)

		this.action = {
			icon: require('assets/images/more.png'),
			onPress: ()=>{
				this.props.onEditTag(this.props.name)
			}
		}
	}

	onPress = ()=>{
		setTimeout(()=>this.props.onItemTap(this.props.name),0)
	}

	render() {
		const {name, count} = this.props
		return (
			<Goto 
				label={name}
				subLabel={count}
				//iconComponent={tagsIcon}
				action={this.action}
				onPress={this.onPress} />
		)
	}
}