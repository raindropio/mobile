import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { setAppearance } from 'local/actions'

import themes from './themes'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'

class SettingsAppearance extends React.Component {
    static options = {
        title: t.s('interfaceStyle')
	}

	onSelect = (id)=>{
		this.props.setAppearance(id)
		//this.props.navigation.goBack()
	}

	render() {
		const { appearance } = this.props

		return (
			<ScrollForm>
				<Form>
                    <PickFlatList
                        options={themes}
                        selected={appearance}
                        onSelect={this.onSelect} />
				</Form>
			</ScrollForm>
		)
	}
}

export default connect(
	(state)=>({
		appearance: state.local.appearance
	}),
	{ setAppearance }
)(SettingsAppearance)