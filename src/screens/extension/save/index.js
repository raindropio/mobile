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

    onEdit = (_id, focusEditTags=false)=>{
        Navigation.setStackRoot(stackId, {
            component: {
                name: 'bookmark/edit',
                passProps: {
                    _id,
                    focusEditTags,
                    isModal: true,
                    onClose: close
                }
            }
        })
    }

    onAddTags = (_id)=>{
        this.onEdit(_id, true)
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