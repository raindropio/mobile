import React from 'react'
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import { close, stackId } from 'modules/extension'
import URL from './url'

export default class ExtensionSave extends React.PureComponent {
    static propTypes = {
        type:           PropTypes.string,
        value:          PropTypes.string,
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

    onEdit = (_id)=>{
        Navigation.setStackRoot(stackId, {
            component: {
                name: 'bookmark/edit',
                passProps: {
                    _id,
                    isModal: true,
                    onClose: close
                }
            }
        })
    }

    onAddTags = (_id)=>{
        Navigation.setStackRoot(stackId, {
            component: {
                name: 'bookmark/tags',
                passProps: {
                    _id,
                    isModal: true,
                    onClose: close
                }
            }
        })
    }

    onTryAgain = ()=>{
        this.onClose()
    }

    onClose = ()=>close()

    render() {
        return (
            <URL 
                {...this.props}
                onEdit={this.onEdit}
                onAddTags={this.onAddTags}
                onTryAgain={this.onTryAgain}
                onClose={this.onClose} />
        )
    }
}