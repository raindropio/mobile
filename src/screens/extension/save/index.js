import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import SaveModule from 'screens/bookmark/add/save/module'
import View from './view'
import { connect } from 'react-redux'

class ExtensionSave extends React.PureComponent {
    static propTypes = {
        type:           PropTypes.string,
        values:         PropTypes.array,
        collectionId:   PropTypes.number
    }

    static options() {
        return {
            topBar: {
                visible: false,
                drawBehind: true
            },
            layout: {
                ...Platform.select({
                    ios: {
                        backgroundColor: 'transparent'
                    },
                    android: {
                        componentBackgroundColor: 'transparent'
                    }
                })
            }
        }
    }

    componentDidMount() {
        this.props.oneLoadColor(this.props.collectionId)
    }

    onEdit = ()=>{
        Navigation.replace(this.props, 'bookmark/edit', {
            _id: this.props.item._id,
            focus: 'title',
        })
    }

    onAddTags = ()=>{
        //todo: support multiple items
        Navigation.replace(this.props, 'bookmark/tags', {
            _id: this.props.item._id
        })
    }

    onToggleImportant = ()=>{
        this.props.oneImportant(this.props.item._id)
    }

    onTryAgain = ()=>{
        this.onClose()
    }

    onClose = ()=>{
        Navigation.close(this.props)
    }

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

export default SaveModule(
    connect(
        undefined,
        {
            oneLoadColor: require('data/actions/collections').oneLoadColor,
            oneImportant: require('data/actions/bookmarks').oneImportant,
        }
    )(ExtensionSave)
)