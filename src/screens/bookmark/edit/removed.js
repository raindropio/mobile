import React from 'react'
import t from 't'
import {
	ScrollForm,
	FormSection,
	Form
} from 'co/style/form'
import {SectionText} from 'co/style/section'
import {
	ButtonLink
} from 'co/common/button'

export default class EditRemovedBookmark extends React.PureComponent {
	render() {
		const {
			type,
			onRecover
		} = this.props;

		return (
			<ScrollForm>
				<Form first>
					<FormSection><SectionText>{t.s(type+'Removed')}</SectionText></FormSection>
					<FormSection><SectionText /></FormSection>
				</Form>

				<ButtonLink onPress={onRecover}>{t.s('restore')}</ButtonLink>
			</ScrollForm>
		)
	}
}