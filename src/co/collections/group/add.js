import t from 't'
import React from 'react'
import View from './view'

export default class CollectionsGroupAdd extends React.PureComponent {
    onPress = ()=>
        this.props.navigation.navigate('group', { screen: 'add' })

    render() {
        return (
            <View 
                title={'+ ' + t.s('createGroup')}
                selectable={true}
                onItemTap={this.onPress} />
        )
    }
}