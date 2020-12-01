import React from 'react'
import t from 't'
import {
	ScrollForm,
	FormSection,
	Form
} from 'co/style/form'
import { SectionText } from 'co/style/section'
import Button from 'co/button'
import Icon from 'co/collections/item/icon'

export default class EditRemovedBookmark extends React.PureComponent {
	render() {
		const {
			onRecover,
			onRemove
		} = this.props;

		return (
			<ScrollForm>
				<Form style={{alignItems: 'center'}}>
					
					<FormSection><SectionText /></FormSection>
					<Icon collectionId={-99} size={48} />
					<FormSection><SectionText>{t.s('removeSuccess')}</SectionText></FormSection>
					<FormSection><SectionText /></FormSection>
				</Form>

				<Button 
					onPress={onRecover} 
					title={t.s('restore')} />

				<Button 
					onPress={onRemove}
					danger
					title={`${t.s('remove')} ${t.s('from')} ${t.s('defaultCollection--99').toLowerCase()}`} />
			</ScrollForm>
		)
	}
}