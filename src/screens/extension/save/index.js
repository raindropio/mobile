import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import { close, stackId } from 'modules/extension'
import SaveModule from 'screens/bookmark/add/save/module'
import View from './view'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import * as collectionsActions from 'data/actions/collections'

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
        this.props.actions.collections.oneLoadColor(this.props.collectionId)
    }

    onEdit = ()=>{
        Navigation.setStackRoot(stackId, {
            component: {
                name: 'bookmark/edit',
                passProps: {
                    _id: this.props.item._id,
                    isModal: true,
                    onClose: close
                }
            }
        })
    }

    onAddTags = ()=>{
        //todo: support multiple items
        Navigation.setStackRoot(stackId, {
            component: {
                name: 'bookmark/tags',
                passProps: {
                    _id: this.props.item._id,
                    isModal: true,
                    onClose: close
                }
            }
        })
    }

    onToggleImportant = ()=>{
        this.props.actions.bookmarks.oneImportant(this.props.item._id)
    }

    onTryAgain = ()=>{
        this.onClose()
    }

    onClose = ()=>close()

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
        (dispatch)=>({
            actions: {
                bookmarks: bindActionCreators(bookmarksActions, dispatch),
                collections: bindActionCreators(collectionsActions, dispatch)
            }
        })
    )(ExtensionSave)
)