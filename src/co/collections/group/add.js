import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import View from './view'

export default class CollectionsGroupAdd extends React.PureComponent {
    onPress = ()=>{
        Navigation.push(this.props, 'collections/group/add')
    }

    render() {
        return (
            <View 
                title={'+ ' + t.s('createGroup')}
                selectable={true}
                onItemTap={this.onPress} />
        )
    }
}