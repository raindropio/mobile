import React from 'react'
import t from 't'

import { Form, Input } from 'co/style/form'

export default class BookmarkEditText extends React.PureComponent {
    _excerpt = {}
    bindExcerpt = i=>this._excerpt=i

	onChangeTitle = (text)=>this.props.onChange({title: text})
    onChangeExcerpt = (text)=>this.props.onChange({excerpt: text})
    focusExcerpt = ()=>this._excerpt && this._excerpt.focus()
    
    render() {
        return (
            <Form first>
                <Input heading
                    value={this.props.title}
                    multiline={true}
                    maxHeight={90}
                    autoGrow={true}
                    placeholder={t.s('enterTitle')}
                    returnKeyType='next'
                    autoFocus={this.props.focus=='title'}
                    onChangeText={this.onChangeTitle}
                    onSubmitEditing={this.focusExcerpt} />

                <Input last optional
                    ref={this.bindExcerpt}
                    value={this.props.excerpt}
                    multiline={true}
                    maxHeight={168}
                    autoGrow={true}
                    autoFocus={this.props.focus=='excerpt'}
                    placeholder={t.s('enterDescription')}
                    returnKeyType='next'
                    onChangeText={this.onChangeExcerpt} />
            </Form>
        )
    }
}