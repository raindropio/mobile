import React from 'react'
import { Linking, Platform } from 'react-native'
import t from 't'
import { connect } from 'react-redux'
import { setBrowser } from 'local/actions'

import browsersList from 'assets/browsers'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'
import Goto from 'co/goto'

class SettingsBrowser extends React.Component {
    static options = {
        title: t.s('openInBrowser')
    }

	onSelect = (id)=>{
		this.props.setBrowser(id)
		this.props.navigation.goBack()
	}

	onChangeSystemDefaultBrowserTap = ()=>{
		Linking.openURL('https://support.apple.com/en-us/HT211336')
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

				{browser=='system' && Platform.OS=='ios' && (
					<Form>
						<Goto 
							last
							icon='settings-2'
							label='Change system default browser'
							onPress={this.onChangeSystemDefaultBrowserTap} />
					</Form>
				)}
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