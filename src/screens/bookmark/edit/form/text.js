import React from 'react'
import t from 't'

import { Wrap, DescriptionInput } from './text.style'
import { Input } from 'co/style/form'

export default class BookmarkEditText extends React.PureComponent {
    _excerpt = {}
    bindExcerpt = i=>this._excerpt=i

	onChangeTitle = (text)=>this.props.onChange({title: text})
    onChangeExcerpt = (text)=>this.props.onChange({excerpt: text})
    focusExcerpt = ()=>this._excerpt && this._excerpt.focus()
    
    render() {
        return (
            <Wrap>
                <Input heading
                    value={this.props.title}
                    multiline={true}
                    maxHeight={78}
                    placeholder={t.s('enterTitle')}
                    returnKeyType='next'
                    autoFocus={this.props.focus=='title'}
                    onChangeText={this.onChangeTitle}
                    onSubmitEditing={this.focusExcerpt} />

                <DescriptionInput last optional
                    ref={this.bindExcerpt}
                    value={this.props.excerpt}
                    multiline={true}
                    maxHeight={168}
                    autoFocus={this.props.focus=='excerpt'}
                    placeholder={t.s('enterDescription')}
                    returnKeyType='next'
                    onChangeText={this.onChangeExcerpt} />
            </Wrap>
        )
    }
}