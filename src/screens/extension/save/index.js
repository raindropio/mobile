import React from 'react'
import PropTypes from 'prop-types'
import SaveModule from 'screens/bookmark/add/save/module'
import View from './view'
import { connect } from 'react-redux'

class Wrap extends React.PureComponent {
    onEdit = ()=>
        this.props.navigation.replace('bookmark', {
            _id: this.props.item._id
        })

    onAddTags = ()=>
        this.props.navigation.replace('bookmark', {
            screen: 'tags',
            params: {
                _id: this.props.item._id
            }
        })

    onToggleImportant = ()=>
        this.props.oneImportant(this.props.item._id)

    onTryAgain = ()=>
        this.onClose()

    onClose = ()=>
        this.props.navigation.goBack()

    render() {
        return (
            <View
				{...this.props}
				onEdit={this.onEdit}
				onAddTags={this.onAddTags}
                onToggleImportant={this.onToggleImportant}
                onTryAgain={this.onTryAgain}
                onClose={this.onClose} />
        )
    }
}

const Module = SaveModule(
    connect(
        undefined,
        {
            oneImportant: require('data/actions/bookmarks').oneImportant,
        }
    )(Wrap)
)

export default class SaveScreen extends React.Component {
    static propTypes = {
        route:  PropTypes.shape({
            params: PropTypes.shape({
                type:           PropTypes.string,
                values:         PropTypes.array,
                collectionId:   PropTypes.number
            })
        })
    }

    static options = {
        animationEnabled: false,
        headerShown: false,
        cardStyle: {
            backgroundColor: 'transparent'
        }
    }

    render() {
        const { route, ...etc } = this.props

        return (
            <Module 
                {...etc} 
                {...route.params} />
        )
    }
}