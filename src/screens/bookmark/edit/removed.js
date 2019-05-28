import React from 'react'
import t from 't'
import {
	ScrollForm,
	FormSection,
	Form
} from 'co/style/form'
import { SectionText } from 'co/style/section'
import { ButtonAction, ButtonLink } from 'co/common/button'
import Icon from 'co/common/icon'

export default class EditRemovedBookmark extends React.PureComponent {
	render() {
		const {
			type,
			onRecover,
			onRemove
		} = this.props;

		return (
			<ScrollForm>
				<Form first style={{alignItems: 'center'}}>
					
					<FormSection><SectionText /></FormSection>
					<Icon collectionId={-99} size='big' />
					<FormSection><SectionText>{t.s(type+'Removed')}</SectionText></FormSection>
					<FormSection><SectionText /></FormSection>
				</Form>

				<ButtonAction onPress={onRecover}>{t.s('restore')}</ButtonAction>
				<ButtonLink onPress={onRemove} danger>{t.s('remove')} {t.s('from')} {t.s('defaultCollection--99').toLowerCase()}</ButtonLink>
			</ScrollForm>
		)
	}
}