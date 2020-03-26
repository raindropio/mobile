import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import { Form, ScrollForm } from 'co/style/form'
import PickFlatList from 'co/list/flat/pick'

export default class PickScreen extends React.Component {
	static propTypes = {
		title:		PropTypes.string,
		subtitle:	PropTypes.string,
		options:	PropTypes.array,
		selected:	PropTypes.any,
		onSelect:	PropTypes.func
	}

	static options({title, subtitle}) {
		return {
			style: 'form',
			topBar: {
				noBorder: false,
				title: {
					text: title
				},
				subtitle: {
					text: subtitle
				},
				largeTitle: {
					visible: true
				}
			}
		}
	}

	onSelect = (id)=>{
		this.props.onSelect(id)
		Navigation.close(this.props)
	}

	render() {
		return (
			<ScrollForm>
				<Form first>
					<PickFlatList {...this.props} onSelect={this.onSelect} />
				</Form>
			</ScrollForm>
		)
	}
}