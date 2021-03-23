import React from 'react'
import { Alert } from 'react-native'
import t from 't'
import { connect } from 'react-redux'
import { set } from 'data/actions/config'

import languages from 'assets/languages/index.json'
import { Form, ScrollForm } from 'co/form'
import PickFlatList from 'co/list/flat/pick'

class SettingsLanguage extends React.Component {
    static options = {
        title: t.s('language')
    }

	options = [
		{ id: '', label: t.s('automatically') },
		...Object.keys(languages).map(id=>({
			id,
			label: languages[id]
		}))
	]

	onSelect = (id)=>{
		this.props.set('lang', id)
		Alert.alert('Please restart the app', 'You need to restart the app to apply language change.')
	}

	render() {
		const { lang } = this.props

		return (
			<ScrollForm>
				<Form>
                    <PickFlatList
                        options={this.options}
                        selected={lang}
                        onSelect={this.onSelect} />
				</Form>
			</ScrollForm>
		)
	}
}

export default connect(
	(state)=>({
		lang: state.config.lang
	}),
	{ set }
)(SettingsLanguage)