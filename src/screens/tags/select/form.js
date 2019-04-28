import React from 'react'
import { ScrollForm, Form } from 'co/style/form'
import TagsForm from 'co/tags/form'

export default class PickTags extends React.PureComponent {
	render() {
		return (
			<ScrollForm>
				<Form first>
					<TagsForm
						current={this.props.current}
						other={this.props.other}
						autoFocus={true}
						onChange={this.props.onChange} />
				</Form>

				{this.props.children}
			</ScrollForm>
		)
	}
}