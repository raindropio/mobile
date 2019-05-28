import React from 'react'
import t from 't'

import { Form, Input } from 'co/style/form'

export default class BookmarkEditText extends React.PureComponent {
    _excerpt = {}
    bindExcerpt = i=>this._excerpt=i

	onChangeTitle = (text)=>this.props.onChange({title: text})
    onChangeExcerpt = (text)=>this.props.onChange({excerpt: text})
    
    render() {
        return (
            <Form >
                <Input heading
                    value={this.props.title}
                    multiline={true}
                    maxHeight={90}
                    autoGrow={true}
                    placeholder={t.s('enterTitle')}
                    returnKeyType='next'
                    autoFocus={this.props.focus=='title'}
                    onChangeText={this.onChangeTitle}
                    onSubmitEditing={this._excerpt.focus}
                    onEndEditing={this.props.onSubmit} />

                <Input last optional
                    ref={this.bindExcerpt}
                    value={this.props.excerpt}
                    multiline={true}
                    maxHeight={84}
                    autoGrow={true}
                    autoFocus={this.props.focus=='excerpt'}
                    placeholder={t.s('enterDescription')}
                    returnKeyType='next'
                    onChangeText={this.onChangeExcerpt}
                    onEndEditing={this.props.onSubmit} />
            </Form>
        )
    }
}