import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import {
	Form,
	ScrollForm
} from 'co/style/form'
import Goto from 'co/common/goto'
import _ from 'lodash'

const unselected = ''
const selected = require('assets/images/selectFilled.png')

export default class PickScreen extends React.Component {
	static propTypes = {
		title:		PropTypes.string,
		options:	PropTypes.array,
		selected:	PropTypes.any,
		onSelect:	PropTypes.func
	}

	static options({title}) {
		return {
			style: 'form',
			topBar: {
				title: {
					text: title
				}
			}
		}
	}

	onSelect = (id)=>{
		this.props.onSelect(id)
		Navigation.close(this.props)
	}

	renderOption = ({id, label, subLabel, icon}, i) => (
		<Goto
			last={i>=this.props.options.length-1}
			key={id}
			label={label}
			subLabel={subLabel}
			iconComponent={icon}
			action={this.props.selected==id?selected:unselected}
			onPress={()=>this.onSelect(id)} />
	)

	render() {
		return (
			<ScrollForm>
				<Form first>
					{this.props.options.map(this.renderOption)}
				</Form>
			</ScrollForm>
		)
	}
}