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

        onRemove: (str)=>{
            const [key, val=1] = str.includes(separator) ? str.split(separator) : ['word', str]
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
            selected = this.props.search.map(({key, val})=>key == 'word' ? val : key+separator+val)

        const notRoot = this.props.collection._id != 0
		let placeholder = t.s('defaultCollection-0')
        if (notRoot)
            placeholder += ' ' + t.s('in') + ' ' + this.props.collection.title

        return (
            <TokenField
                value={this.props.value}
                placeholder={placeholder}
                blurOnSubmit
                autoFocus={notRoot || Platform.OS=='ios'}
                returnKeyType='search'
                selected={selected || emptyArray}
                showCancel={notRoot}
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