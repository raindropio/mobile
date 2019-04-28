import React from 'react'
import { Form, Input, FormSection } from 'co/style/form'
import { SectionText } from 'co/style/section'

export default class BookmarkEditURL extends React.PureComponent {
    onChange = (link)=>this.props.onChange({link})

    render() {
        return (
            <React.Fragment>
                <FormSection><SectionText>URL</SectionText></FormSection>
				<Form>
					<Input last
						value={this.props.link}
						multiline={true}
                        autoGrow={true}
                        onChangeText={this.onChange}
						onEndEditing={this.props.onSubmit} />
				</Form>
            </React.Fragment>
        )
    }
}