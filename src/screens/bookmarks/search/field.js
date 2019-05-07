import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import TokenField from 'co/common/tokenField'
import { connect } from 'react-redux'
import { collection } from 'data/selectors/collections'

const emptyArray = []
const separator = '∻'

class SearchField extends React.PureComponent {
    events = {
        onAdd: (val)=>{
            if (val)
                this.props.events.onAppend('word', val)
        },

        onRemove: (index)=>{
            const {key, val} = this.props.search[index]
            this.props.events.onRemove(key, val)
        },

        onValueChange: this.props.events.onFieldValueChange,
        onFocus: this.props.events.onFieldFocus,
        onBlur: this.props.events.onFieldBlur,
        onClear: this.props.events.onCancel
    }

    render() {
        let selected = undefined
        if (this.props.search)
            selected = this.props.search.map(({key, val})=>{
                switch(key) {
                    case 'important': return t.s('favoriteSites')
                    case 'broken': return t.s('broken')
                    case 'word': return val
                    case 'tag': return `#${val}`
                    case 'type': return t.s(val+'s')
                }
            })

		let placeholder = t.s('defaultCollection-0')
        if (!this.props.isRoot)
            placeholder += ' ' + t.s('in') + ' ' + this.props.collection.title

        return (
            <TokenField
                value={this.props.value}
                placeholder={placeholder}
                blurOnSubmit
                autoFocus={!this.props.isRoot || Platform.OS=='ios'}
                returnKeyType='search'
                selected={selected || emptyArray}
                showCancel={!this.props.isRoot}
                events={this.events} />
        )
    }
}

export default connect(
	(state, {spaceId})=>({
		collection: collection(state, parseInt(spaceId)),
	}),
	undefined
)(SearchField)