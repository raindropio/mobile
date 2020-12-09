import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { set } from 'data/actions/config'
import { ThemeContext } from 'styled-components'

import options from './options'
import { Form, ScrollForm, FormSection } from 'co/form'
import { SectionText } from 'co/style/section'
import PickFlatList from 'co/list/flat/pick'

class SettingsExtensionMode extends React.Component {
	static contextType = ThemeContext

    static options = {
        title: t.s('newBookmark')
	}

	onSelect = (id)=>{
		if (id == null)
			this.props.set({
				add_auto_save: false,
			})
		else
			this.props.set({
				add_auto_save: true,
				add_default_collection: id
			})

		this.props.navigation.goBack()
	}

	render() {
		const { add_default_collection, add_auto_save } = this.props

		return (
			<ScrollForm>
				<FormSection><SectionText>{t.s('save') + ' ' + t.s('to') + ' ' + t.s('collection').toLowerCase()+':'}</SectionText></FormSection>
				<Form>
                    <PickFlatList
                        options={options}
                        selected={add_auto_save ? add_default_collection : null}
                        onSelect={this.onSelect} />
				</Form>

				{this.context.isExtension && (
					<SectionText center>{t.s('changeLaterInSettings')}</SectionText>
				)}
			</ScrollForm>
		)
	}
}

export default connect(
	(state)=>({
		add_default_collection: state.config.add_default_collection,
        add_auto_save: state.config.add_auto_save
	}),
	{ set }
)(SettingsExtensionMode)