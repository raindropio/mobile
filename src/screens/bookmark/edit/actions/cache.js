import { Component } from 'react';
import t from 't'
import Goto from 'co/goto'

export default class EditBookmarkCache extends Component {
    state = {
        link: ''
    }

    cacheTitle = t.s('open') + ' ' + t.s('permanentCopy').toLowerCase()
    
    onPress = ()=>
        this.props.navigation.replace('browser/internal', { bookmark: this.props.item, view: 'cache' })

	render() {
        const { item } = this.props

        if (item.cache != 'ready')
            return null

		return (
            <Goto 
                icon='file-history'
                action=''
                onPress={this.onPress}
                label={this.cacheTitle} />
        )
	}
}