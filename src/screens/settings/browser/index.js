import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { setBrowser } from 'local/actions'

import browsersList from 'assets/browsers'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'

class SettingsBrowser extends React.Component {
    static options = {
        title: t.s('openInBrowser')
    }

	onSelect = (id)=>{
		this.props.setBrowser(id)
		this.props.navigation.goBack()
	}

	render() {
		const { browser } = this.props

		return (
			<ScrollForm>
				<Form>
                    <PickFlatList
                        options={browsersList}
                        selected={browser}
                        onSelect={this.onSelect} />
				</Form>
			</ScrollForm>
		)
	}
}

export default connect(
	(state)=>({
		browser: state.local.browser
	}),
	{ setBrowser }
)(SettingsBrowser)